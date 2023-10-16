import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseModelWithMeta } from '../abstracts/base.model';

@Table
export class Bookmarks extends BaseModelWithMeta {
  @Column({ type: DataType.STRING(30) })
  name: string;

  @Column({ type: DataType.STRING(255) })
  url: string;

  @Column({ type: DataType.UUID })
  userId: string;
}
