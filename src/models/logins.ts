import User from '@models/user';

import type LoginsInterface from './logins.interface';
import { LoginMethods } from './logins.interface';

import { DataTypes, type Optional } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

type LoginsInterfaceModel = Optional<LoginsInterface, 'id'>;

@Table({
  tableName: `logins`,
  freezeTableName: true,
  timestamps: false
})

export default class Logins extends Model<LoginsInterface, LoginsInterfaceModel> implements LoginsInterfaceModel {
  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  declare user_id: number;

  @Column(DataTypes.ENUM(...Object.values(LoginMethods)))
  declare method: LoginMethods;

  @Column(DataTypes.STRING(64))
  declare address: string;

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  declare date: Date;
}
