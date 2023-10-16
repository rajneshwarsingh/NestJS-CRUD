/*
 * @file: user.controller.ts
 * @description:  It contain controller funcations layer for user.controller.
 * @author: Rajneshwar Singh
 */

import { Controller, Get, Put, Delete, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { getAll, updateUser } from './user.dto';
import { AuthGuard } from '../utils/authGuard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private authService: UserService) {}
  @Get('/')
  getAll(@Query() payload: getAll) {
    return this.authService.getAll(payload);
  }

  @Get('/:id')
  getById(@Param() payload) {
    return this.authService.getById(payload);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() payload: updateUser, @Req() request) {
    return this.authService.update(id, payload, request.user?.id);
  }

  @Delete('/:id')
  delete(@Param('id') id, @Req() request) {
    return this.authService.delete(id, request.user?.id);
  }
}
