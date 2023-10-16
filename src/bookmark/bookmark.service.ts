/*
 * @file: bookmark.service.ts
 * @description:  It contain service funcations layer for bookmark.service.
 * @author: Rajneshwar Singh
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookmarks } from '../models/bookmarks.model';
import { BaseService } from '../abstracts/base.service';
import logger from '../utils/logger';
import { errorMessages, statusCode, successMessages } from '../utils/messages';
import { getAll } from './bookmark.dto';
@Injectable()
export class BookmarkService extends BaseService {
  constructor(
    @InjectModel(Bookmarks)
    private bookmarkModel: typeof Bookmarks,
  ) {
    super();
  }

  async create(payload) {
    try {
      const newBookmark = await this.bookmarkModel.create(payload);
      return this.responses(newBookmark, statusCode.success, successMessages.create('Bookmark'));
    } catch (err) {
      logger.error(errorMessages.errorLog('update', 'bookmark', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async getAll(payload: getAll) {
    try {
      const page = Number(payload.page) || 1;
      const limit = Number(payload.limit) || 10;
      const offset = (page - 1) * limit;
      const sortBy = payload.sortBy || 'createdAt';
      const sortOrder = payload.sortOrder || 'desc';

      const bookmarks = await this.bookmarkModel.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name', 'url', 'userId', 'createdAt'],
        order: [[sortBy, sortOrder]],
        offset,
        limit,
      });

      return this.responses(bookmarks, statusCode.success, successMessages.fetch('Bookmark'));
    } catch (err) {
      logger.error(errorMessages.errorLog('getAll', 'bookmark', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async getById(payload) {
    try {
      const bookmark = await this.bookmarkModel.findOne({
        where: { id: payload.id, isDeleted: false },
        attributes: ['id', 'name', 'url', 'userId', 'createdAt'],
      });

      if (!bookmark) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('Bookmark'));
      }

      return this.responses(bookmark, statusCode.success, successMessages.fetch('Bookmark'));
    } catch (err) {
      logger.error(errorMessages.errorLog('getById', 'bookmark', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async update(bookmarkId, payload, updatedBy) {
    try {
      const bookmark = await this.bookmarkModel.findOne({
        where: { id: bookmarkId, isDeleted: false },
      });

      if (!bookmark) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('Bookmark'));
      }
      await bookmark.update({ ...payload, updatedBy });
      await delete bookmark.dataValues.password;
      return this.responses(bookmark, statusCode.success, successMessages.update('Bookmark'));
    } catch (err) {
      logger.error(errorMessages.errorLog('update', 'bookmark', payload, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }

  async delete(bookmarkId, deletedBy) {
    try {
      const bookmark = await this.bookmarkModel.findOne({
        where: { ...bookmarkId, isDeleted: false },
      });

      if (!bookmark) {
        return this.responses({}, statusCode.notFound, errorMessages.notExist('Bookmark'));
      }
      await bookmark.update({ isDeleted: true, deletedBy: deletedBy.id, deletedAt: new Date().getTime() });
      return this.responses({}, statusCode.success, successMessages.delete('Bookmark'));
    } catch (err) {
      logger.error(errorMessages.errorLog('update', 'bookmark', bookmarkId, err));
      return this.errorResponses(statusCode.badRequest, err.message);
    }
  }
}
