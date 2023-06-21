import User from '@models/user';

import type ActivityInterface from './activity.interface';

import { DataTypes, type Optional } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

type ActivityInterfaceModel = Optional<ActivityInterface, 'id'>;

@Table({
  tableName: `activities`,
  freezeTableName: true,
  timestamps: false
})

export default class Activity extends Model<ActivityInterface, ActivityInterfaceModel> implements ActivityInterfaceModel {
  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  declare user_id: number;

  @Column(DataTypes.STRING)
  declare message: string;

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  declare date: Date;

  @BelongsTo(() => User, `user_id`)
  declare user?: User;
}
