/*
 * @file: bookmark.module.ts
 * @description: It contain bookmark module.
 * @author: Rajneshwar Singh
 */

import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmarks } from '../models/bookmarks.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Bookmarks]), JwtModule.register({})],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
