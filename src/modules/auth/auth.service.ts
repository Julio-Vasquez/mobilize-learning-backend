import { Injectable, Body } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { HashPassword, ComparePassword } from '../@common/bcrypt/bcrypt';
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
    @InjectConnection() private readonly connection: Connection,
  ) { }

  public async Login(login: LoginDto): Promise<any> {
    const user: IUser = await this.UserModel.findOne(
      {
        userName: login.userName,
      },
      { _id: 0, people: 0, __v: 0, password: 0 },
    ).exec();
    if (!user)
      return { error: 'NOT_EXIST_USER', detail: 'No existe el Usuario' };
    else if (user.state !== State.Active)
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };
    return user /*&& (await ComparePassword(login.password, user.password))*/
      ? user
      : { error: 'NO_EQUALS_PASSWORD', detail: 'Las contraseñas no coinciden' };
  }

  //falta la carga de la imagen de perfil {cover}
  public async SignUp(@Body() account: SignUpDto) {
    const usr = await this.UserModel.findOne({
      userName: account.userName,
    });

    const ple = await this.PeopleModel.findOne({
      identification: account.identification,
    });

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

      const user = new this.UserModel({
        _id: Types.ObjectId(),
        userName: account.userName,
        password: account.password,
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
      userName: user.userName,
    }).exec();

    if (!account) {
      return { error: 'NOT_EXIST_USER', detail: 'No existe el Usuario' };
    } else if (account.state !== State.Active) {
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };
    }
    const privateCode = randomStringGenerator();

    await this.UserModel.updateOne(
      { userName: user.userName },
      { code: privateCode },
    ).exec();
    //token expire in 25minutes
    const token = this.jwt.sign(
      {
        ID: account._id,
        OldPassword: account.password,
        User: account.userName,
        Code: privateCode,
      },
      { expiresIn: 1500 },
    );

    const mail = await this.mail.SendSingleEMailHtml(
      account.email,
      'Reset Password',
      `url/${token}`,
    );

    return !mail
      ? {
        error: 'ERROR_SEND_EMAIL',
        detail: 'Ocurrio un problema al enviar el email',
      }
      : { sucess: 'OK' };
  }

  public async ForgotPassword(restore: ResetPasswordDto) {
    const token: any = this.jwt.decode(restore.token);

    if (!token)
      return {
        error: 'INVALID_TOKEN',
        detail: 'Token invalido, o no encontrado',
      };
    else if (token.exp <= Math.round(new Date().getTime() / 1000))
      return { error: 'TOKEN_EXPIRED', detaul: 'token expirado' };

    const currentUser = await this.UserModel.findOne({
      _id: token.ID,
      password: token.OldPassword,
      userName: token.User,
      code: token.Code,
    }).exec();

    if (!currentUser)
      return {
        error: 'NO_EXIST_USER',
        detail: 'No existe usuario con esas credenciales ',
      };
    else if (currentUser.state !== State.Active)
      return { error: 'INACTIVE_USER', detail: 'Usuario Inactivo' };

    const privateCode = randomStringGenerator();

    const result = await this.UserModel.updateOne(
      {
        _id: token.ID,
        password: token.OldPassword,
        userName: token.User,
        code: token.Code,
      },
      {
        password: await HashPassword(restore.newPassword),
        code: privateCode,
      },
    ).exec();

    return result.nModified > 0
      ? { sucess: 'OK' }
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
