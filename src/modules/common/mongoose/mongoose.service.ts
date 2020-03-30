import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { User } from '../../../entities/user.entity';
import { People } from '../../../entities/people.entity';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    //falta cambiarlo
    return {
      type: 'mongodb',
      host: this.config.get<string>('app.db_Host'),
      port: parseInt(this.config.get<string>('app.db_Port')),
      database: this.config.get<string>('app.db_Database'),
      entities: [User, People],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
    };
  }
}
