import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService) { }

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    //falta cambiarlo
    const TYPE = this.config.get<string>('app.db_Type'),
      HOST = this.config.get<string>('app.db_Host'),
      PORT = this.config.get<string>('app.db_Port'),
      DB = this.config.get<string>('app.db_Database');
    return {
      uri: `${TYPE}://${HOST}:${PORT}/${DB}`,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
  }
}
