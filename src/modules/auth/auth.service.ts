import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';

import { HashPassword, ComparePassword } from '../@common/bcrypt';
import { Mail } from '../@common/mail';

import { UserService } from './../user/user.service';

import { LoginDto, UserDto, ResetPasswordDto, SignUpDto } from './dto';
import { IUser, IPeople } from './interface';
import { State, Role } from '../@common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<IUser>,
    @InjectModel('People')
    private readonly PeopleModel: Model<IPeople>,
    private readonly userService: UserService,
    private readonly mail: Mail,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @InjectConnection() private readonly connection: Connection,
  ) { }

  public async Login(login: LoginDto) {
    const user: any = await this.UserModel.findOne(
      { userName: login.userName.toUpperCase() },
      { _id: 0, people: 0, __v: 0, code: 0, email: 0 },
    ).exec();
    if (!user)
      return { error: 'NOT_EXIST_USER', detail: 'No existe el Usuario' };
    else if (user.state !== State.Active)
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };
    //delete user.password;
    return user && (await ComparePassword(login.password, user.password))
      ? user
      : { error: 'NO_EQUALS_PASSWORD', detail: 'Las contraseñas no coinciden' };
  }

  //falta la carga de la imagen de perfil {cover}
  public async SignUp(account: SignUpDto) {
    const usr = await this.UserModel.findOne({
      userName: account.userName,
    }).exec();

    const ple = await this.PeopleModel.findOne({
      identification: account.identification,
    }).exec();

    console.log(usr && ple);
    if (usr && ple)
      return {
        error: 'EXISTING_USER',
        detail: 'Ya existe el usuario que desea registrar',
      };

    const session = await this.connection.startSession();
    session.startTransaction({
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
      readPreference: 'primary',
    });

    try {
      const id = Types.ObjectId();
      const people = new this.PeopleModel({
        _id: id,
        identification: account.identification,
        name: account.name,
        lastName: account.lastName,
        gender: account.gender,
        birthDate: account.birthDate,
        typeDoc: account.typeDoc,
        state: State.Active,
      });
      await people.save();

      console.log(people);
      const user = new this.UserModel({
        _id: Types.ObjectId(),
        userName: account.userName.toUpperCase(),
        password: await HashPassword(account.password),
        avatar: 'asdasd',
        email: account.email,
        code: randomStringGenerator(),
        role: Role.student,
        state: State.Active,
        people: id,
      });
      await user.save();

      await session.commitTransaction();
    } catch (exp) {
      await session.abortTransaction();
      return {
        error: 'ABORT_TRANSACTION',
        detail: `Se aborto la transaccion, no pudo ser finalizada con exito : ${exp}`,
      };
    } finally {
      session.endSession();
    }
    return { succes: 'OK' };
  }

  //falta acomodar la url
  public async RequestForgotPassword(user: UserDto) {
    const account = await this.UserModel.findOne({
      userName: user.userName.toUpperCase(),
    }).exec();

    if (!account) {
      return { error: 'NOT_EXIST_USER', detail: 'No existe el Usuario' };
    } else if (account.state !== State.Active) {
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };
    }
    const privateCode = randomStringGenerator();

    await this.UserModel.updateOne(
      { userName: user.userName.toUpperCase() },
      { code: privateCode },
    ).exec();
    //token expire in 25minutes
    const token = this.jwt.sign(
      {
        ID: account._id,
        User: account.userName,
        Code: privateCode,
      },
      { expiresIn: 1500 },
    );
    const mail = await this.mail.SendSingleEMailHtml(
      account.email,
      'Reset Password',
      `${this.config.get<string>('app.client_Host')}/setnewpassword/${token}`,
      account.userName,
      this.config.get<string>('app.client_Host'),
    );

    return !mail
      ? {
        error: 'ERROR_SEND_EMAIL',
        detail: 'Ocurrio un problema al enviar el email',
      }
      : { success: 'OK' };
  }

  public async ForgotPassword(restore: ResetPasswordDto) {
    console.log(restore);
    const token: any = this.jwt.decode(restore.token);
    console.log(token);
    if (!token)
      return {
        error: 'INVALID_TOKEN',
        detail: 'Token invalido, o no encontrado',
      };
    else if (token.exp <= Math.round(new Date().getTime() / 1000))
      return { error: 'TOKEN_EXPIRED', detail: 'token expirado' };

    const checkCode = await this.UserModel.findOne({
      _id: token.ID,
      code: token.Code,
    }).exec();

    if (!checkCode)
      return {
        error: 'NO_EQUALS_CODE',
        detail: 'Su private code fue cambiado',
      };

    const currentUser = await this.UserModel.findOne({
      _id: token.ID,
      userName: token.User.toUpperCase(),
      code: token.Code,
    }).exec();

    console.log(currentUser);
    if (!currentUser)
      return {
        error: 'NO_EXIST_USER',
        detail:
          'No existe usuario con esas credenciales o su private code fue cambiado',
      };
    else if (currentUser.state !== State.Active)
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };

    const privateCode = randomStringGenerator();

    const result = await this.UserModel.updateOne(
      {
        _id: token.ID,
        userName: token.User.toUpperCase(),
        code: token.Code,
      },
      {
        password: await HashPassword(restore.password),
        code: privateCode,
      },
    ).exec();

    return result.nModified > 0
      ? { success: 'OK' }
      : {
        error: 'NO_UPDATE',
        detail: 'Datos iguales',
      };
  }

  public async ValidUserToken(token: any): Promise<boolean> {
    if (!token) return false;
    return await this.userService.ValidUserToken(token);
  }

  public async ValidUser(userName: string, password: string) {
    return this.userService.ValidUser(userName, password);
  }
}
