/*
 * @file: user.dto.ts
 * @description:  It contain dto classes for user.dto.
 * @author: Rajneshwar Singh
 */

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class getAll {
  @IsNotEmpty()
  limit;

  @IsNotEmpty()
  page;

  @IsNotEmpty()
  @IsString()
  sortBy;

  @IsNotEmpty()
  @IsString()
  sortOrder;
}

export class updateUser {
  @IsOptional()
  @IsString()
  firstName;

  @IsOptional()
  @IsString()
  lastName;

  @IsOptional()
  @IsEmail()
  email;

  @IsOptional()
  @IsString()
  password;
}
