/*
 * @file: user.module.ts
 * @description: It contain user module.
 * @author: Rajneshwar Singh
 */

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../models/users.model';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forFeature([Users]), JwtModule.register({})],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
