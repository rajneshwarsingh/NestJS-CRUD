/*
 * @file: user.service.ts
 * @description:  It contain service funcations layer for user.service.
 * @author: Rajneshwar Singh
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../models/users.model';
import { getAll } from './user.dto';
import { BaseService } from '../abstracts/base.service';
import logger from '../utils/logger';
import * as argon2 from 'argon2';
import { errorMessages, statusCode, successMessages } from '../utils/messages';
@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {
    super();
  }

  async getAll(payload: getAll) {
    try {
      const page = Number(payload.page) || 1;
      const limit = Number(payload.limit) || 10;
      const offset = (page - 1) * limit;
      const sortBy = payload.sortBy || 'createdAt';
      const sortOrder = payload.sortOrder || 'desc';

      const users = await this.userModel.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt'],
        order: [[sortBy, sortOrder]],
        offset,
        limit,
      });

      return this.responses(users, statusCode.success, successMessages.fetch('User'));
    } catch (err) {
      logger.error(errorMessages.errorLog('getAll', 'user', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async getById(payload) {
    try {
      const user = await this.userModel.findOne({
        where: { id: payload.id, isDeleted: false },
        attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt'],
      });

      if (!user) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('User'));
      }

      return this.responses(user, statusCode.success, successMessages.fetch('User'));
    } catch (err) {
      logger.error(errorMessages.errorLog('getById', 'user', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async update(userId, payload, updatedBy) {
    try {
      const user = await this.userModel.findOne({
        where: { id: userId, isDeleted: false },
      });

      if (!user) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('User'));
      }
      if (payload.password) {
        payload.password = await argon2.hash(payload.password);
      }
      await user.update({ ...payload, updatedBy });
      await delete user.dataValues.password;
      return this.responses(user, statusCode.success, successMessages.update('User'));
    } catch (err) {
      logger.error(errorMessages.errorLog('update', 'user', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async delete(userId, deletedBy) {
    try {
      const user = await this.userModel.findOne({
        where: { id: userId, isDeleted: false },
      });

      if (!user) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('User'));
      }
      await user.update({ isDeleted: true, deletedBy, deletedAt: new Date().getTime() });
      return this.responses({}, statusCode.success, successMessages.delete('User'));
    } catch (err) {
      logger.error(errorMessages.errorLog('update', 'user', userId, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }
}
