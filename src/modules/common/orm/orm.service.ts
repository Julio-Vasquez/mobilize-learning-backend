import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from './../../../entities/user.entity';
import { People } from './../../../entities/people.entity';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
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
