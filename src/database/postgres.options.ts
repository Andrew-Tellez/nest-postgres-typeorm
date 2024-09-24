import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresDataSource } from './postgres.datasource';

export const postgresOptions: TypeOrmModuleOptions = {
  ...PostgresDataSource.options,
  autoLoadEntities: true,
};
