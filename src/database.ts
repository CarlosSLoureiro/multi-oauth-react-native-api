import Activity from "@models/activity";
import User from "@models/user";

import { Sequelize } from 'sequelize-typescript';

export default abstract class Database {
  static models = [User, Activity];

  public static async config (): Promise<void> {
    const { MYSQL_BASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = process.env;

    const sequelize = new Sequelize(MYSQL_BASE, MYSQL_USER, MYSQL_PASS, {
      host: MYSQL_HOST,
      logging: false,
      dialect: `mysql`,
      models: Database.models
    });

    try {
      await sequelize.sync({ force: false });
      console.log(`\x1b[32m`, `Successfully connected to the Database!`, `\x1b[0m`);
    } catch (e) {
      console.log(e);
      console.log(`\x1b[31m`, `Failed to connect to the Database!`, `\x1b[0m`);
    }
  }

  public static test (): void {
    const sequelize = new Sequelize({
      dialect: `sqlite`,
      storage: `:memory:`,
      models: Database.models
    });
  }
}
