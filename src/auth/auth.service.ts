/*
 * @file: auth.service.ts
 * @description:  It contain service funcations layer for auth.service.
 * @author: Rajneshwar Singh
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../models/users.model';
import { signUpDTO, signInDTO } from './auth.dto';
import * as argon2 from 'argon2';
import { BaseService } from '../abstracts/base.service';
import { Type } from '../utils/enums';
import logger from '../utils/logger';
import { errorMessages, statusCode, successMessages } from '../utils/messages';
import { JwtService } from '@nestjs/jwt';
import config from '../config/config';
@Injectable()
export class AuthService extends BaseService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {
    super();
  }

  async signUp(payload: signUpDTO) {
    try {
      const user = await this.userModel.findOne({
        where: { email: payload.email, isDeleted: false },
      });
      if (user) {
        return this.errorResponses(statusCode.badRequest, errorMessages.alreadyExists(Type.user));
      }
      const hashedPassword = await argon2.hash(payload.password);
      const newUser = await this.userModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hashedPassword,
      });

      return this.responses(newUser, statusCode.createdSuccess, successMessages.create('User'));
    } catch (err) {
      logger.error(errorMessages.errorLog('signUp', 'auth', payload, err));
      return this.errorResponses(err.message, statusCode.badRequest);
    }
  }

  async signIn(payload: signInDTO) {
    try {
      const users = await this.userModel.findOne({
        where: { email: payload.email, isDeleted: false },
        attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'isActive', 'isDeleted'],
      });
      if (!users) {
        return this.errorResponses(statusCode.badRequest, errorMessages.notExist(Type.user));
      }
      const hashedPassword = await argon2.verify(users.password, payload.password);
      if (hashedPassword) {
        await delete users.dataValues?.password;
        const jwtObj = {
          id: users.dataValues.id,
          email: users.dataValues.email,
        };
        users.dataValues.token = await this.jwtService.signAsync(jwtObj, { expiresIn: '190m', secret: config.jwtSecretKey });
        return this.responses(users, statusCode.success, successMessages.login);
      } else {
        return this.errorResponses(statusCode.badRequest, errorMessages.invalidLogin);
      }
    } catch (err) {
      logger.error(errorMessages.errorLog('signIn', 'auth', payload, err));
      return this.errorResponses(err.message, statusCode.badRequest);
    }
  }
}
