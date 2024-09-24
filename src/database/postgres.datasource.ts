import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'myuser',
  password: 'mypassword',
  database: 'mydatabase',
  synchronize: true,
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
