import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { postgresOptions } from './database/postgres.options';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(postgresOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
