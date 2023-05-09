import { DataTypes, Model, type Sequelize } from "sequelize";

export default class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public static initialize (sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: `users`,
        timestamps: true
      }
    );
  }
}
