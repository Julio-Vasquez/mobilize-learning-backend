import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { create } from 'html-pdf';
import { convert } from 'pdf-transform-png';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { join } from 'path';

import { CertificateDto } from './dto';
import { ICertificate, IUser } from './interface';
import { Template } from './../@common/certificate/template';

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
    const user = await this.userModel.aggregate([
      {
        $lookup: {
          from: "peoples",
          localField: "people",
          foreignField: "_id",
          as: "peopleDoc"
        }
      },
      { $unwind: "$peopleDoc" },
      {
        $match: {
          userName: account.userName.toUpperCase()
        }
      },
      {
        $project: {
          _id: 1,
          name: "$peopleDoc.name",
          lastName: "$peopleDoc.lastName",
          identification: "$peopleDoc.identification"
        }
      }
    ]).exec();

    if (!user) return { error: 'NO_EXISTS_USER', detail: 'usted es infiltrado!' };

    const certificate = await this.certificateModel.findOne({ idUser: user[0]._id }).exec();

    if (!certificate) await this.CreateCertificateBase(user[0]._id);//en caso de no existir el registro lo creo

    //si existe el registro
    const { _id, generate, progress, urlCertificate, urlPreview } = certificate;

    if (generate) return { certificate: urlCertificate, preview: urlPreview, generate: false }; //ya ha sido generado, solo se retorna la url
    else if (progress === 100) {  //ya completo el contenido, pero nunca genero el certificado
      //generaremos el certificado chekeando que ya tenga el 100% del contenido terminado
      const html = Template(user[0].name, user[0].lastName, user[0].identification); //obtengo la plantilla html para crear el pdf

      const fileName = randomStringGenerator();//creo un nombre unico
      //genero pdf
      create(html, {
        height: '878px',
        width: '1920px',
      }).toFile(`uploads/certificatesPdf/${fileName}.pdf`, (err, res) => {
        if (err) console.log(err)
        else console.log(res)
      });
      const fullPathPdf: string = `http://${this.config.get<string>('app.host')}:${this.config.get<number>('app.port')}/${this.config.get<string>('app.prefix')}/files/certificatesPdf/${fileName}.pdf`;
      const fullPathPng: string = `http://${this.config.get<string>('app.host')}:${this.config.get<number>('app.port')}/${this.config.get<string>('app.prefix')}/files/certificatesPng/${fileName}.png`;
      //configuracion para convertir el pdf a imagen
      const config = {
        fileName: join(__dirname + `../../../../uploads/certificatesPdf/${fileName}.pdf`),
        exportPath: 'uploads/certificatesPng/',
        convertTo: 'png',
      }
      //le doy un time al metodo anterior por que es lento!
      setTimeout(() => {
        convert(config)
      }, 4000);
      //actualizo las urls
      await this.certificateModel.updateOne({ _id: _id }, { urlCertificate: fullPathPdf, generate: true, urlPreview: fullPathPng });
      //retorno las url
      return { certificate: fullPathPdf, preview: fullPathPng, generate: true };
    } else return { error: 'PROGRESS_NOT_FULL', detail: 'No ha completado el 100% de los cursos' };//no ha completado el contenidoido generado y solicita el certificado

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
