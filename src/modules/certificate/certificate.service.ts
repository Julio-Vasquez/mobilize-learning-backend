import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import { CertificateDto } from './dto';
import { ICertificate, IUser } from './interface';

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel('Certificate')
    private readonly certificateModel: Model<ICertificate>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,

    private readonly config: ConfigService,
  ) { }

  public async Generate(account: CertificateDto) {
    const user = await this.userModel.findOne(
      { userName: account.userName.toUpperCase() }
    ).exec();

    if (!user) return { error: 'NO_EXISTS_USER', detail: 'usted es infiltrado!' };

    const { people, _id } = user;
    const certificate = await this.certificateModel.findOne({ idUser: _id }).exec();
    if (!certificate) this.CreateCertificateBase(_id);
    //si existe el registro
    const { generate, progress, urlCertificate } = certificate;

    if (generate) return urlCertificate; //ya ha sido generado, solo se retorna la url
    else if (progress === 100) {  //ya completo el contenido, pero nunca genero el certificado
      //generaremos el certificado chekeando que ya tenga el 100% del contenido terminado
      return urlCertificate;
    } else return { error: 'PROGRESS_NOT_FULL', detail: 'No ha completado el 100% de los cursos' };//no ha completado el contenido, y solicita el certificado

  }
  //metodo para solicitar crear el primer registro, cuando se intente actualizar el progreso
  //se asume que en el otro servicio se valida el usuario y envia su id
  public async CreateCertificateBase(_id: string) {
    const certificate = new this.certificateModel({
      _id: Types.ObjectId(),
      generate: false,
      progress: 0,
      idUser: _id
    })
    await certificate.save();
    return true;
  }
}
