/*
 * @file: base.model.ts
 * @description: It contain base of db schema.
 * @author: Rajneshwar Singh
 */

import { Column, DataType, Model, PrimaryKey } from 'sequelize-typescript';

//Base Model to generate meta data like createdAt and updatedAt
export abstract class BaseModel extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: () => new Date().getTime(),
  })
  createdAt: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: () => new Date().getTime(),
  })
  updatedAt: number;
}

//Base model to generate uuid
export abstract class BaseModelWithId extends BaseModel {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
}

//Base Model to generate meta data like createdBy and updatedBy
export abstract class BaseModelWithMeta extends BaseModelWithId {
  @Column({ type: DataType.UUID, defaultValue: null, allowNull: true })
  updatedBy: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column({ type: DataType.BIGINT, allowNull: true, defaultValue: null })
  deletedAt: number;

  @Column({ type: DataType.UUID, defaultValue: null, allowNull: true })
  deletedBy: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
