import { AfterCreate, AfterUpdate, Column, Table, DataType } from 'sequelize-typescript';
import { BaseModelWithMeta } from '../abstracts/base.model';

@Table
export class Users extends BaseModelWithMeta {
  @Column({ type: DataType.STRING(30) })
  firstName: string;

  @Column({ type: DataType.STRING(30) })
  lastName: string;

  @Column({ type: DataType.STRING(255) })
  email: string;

  @Column({ type: DataType.STRING(255) })
  password: string;

  // Hook to delete password after creating a new user
  @AfterCreate
  static deletePasswordAfterCreate(instance: Users) {
    delete instance.dataValues.password;
  }

  // Hook to delete password after updating a user
  @AfterUpdate
  static deletePasswordAfterUpdate(instance: Users) {
    delete instance.dataValues.password;
  }
}
