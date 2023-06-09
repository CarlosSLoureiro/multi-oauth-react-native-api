import type UserInterface from './user.interface';

import { DataTypes, type Optional } from 'sequelize';
import { AllowNull, Column, Model, NotEmpty, Table, Unique } from 'sequelize-typescript';

type UserInterfaceModel = Optional<UserInterface, 'id'>;

@Table({
  tableName: `users`,
  freezeTableName: true,
  timestamps: true
})

export default class User extends Model<UserInterface, UserInterfaceModel> implements UserInterfaceModel {
  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING)
  declare name: string;

  @AllowNull(false)
  @NotEmpty
  @Unique
  @Column(DataTypes.STRING)
  declare email: string;

  @Column(DataTypes.STRING)
  declare password?: string | null;
}
