/*
 * @file: bookmark.controller.ts
 * @description:  It contain controller funcations layer for bookmark.controller.
 * @author: Rajneshwar Singh
 */

import { Controller, Post, Get, Put, Delete, Body, Query, Param, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { getAll, createBookmark, updateBookmark } from './bookmark.dto';
import { AuthGuard } from '../utils/authGuard';

@UseGuards(AuthGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('/')
  create(@Body() payload: createBookmark) {
    return this.bookmarkService.create(payload);
  }

  @Get('/')
  getAll(@Query() payload: getAll) {
    return this.bookmarkService.getAll(payload);
  }

  @Get('/:id')
  getById(@Param() payload) {
    return this.bookmarkService.getById(payload);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() payload: updateBookmark, @Req() req) {
    return this.bookmarkService.update(id, payload, req.user?.id);
  }

  @Delete('/:id')
  delete(@Param() id, @Req() req) {
    return this.bookmarkService.delete(id, req.user?.id);
  }
}
