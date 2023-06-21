import Logins from "@models/logins";
import User from "@models/user";

import { Sequelize } from 'sequelize-typescript';

export default class Database {
  private sequelize: Sequelize;

  public async config (): Promise<void> {
    const { MYSQL_BASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = process.env;

    this.sequelize = new Sequelize(MYSQL_BASE, MYSQL_USER, MYSQL_PASS, {
      host: MYSQL_HOST,
      logging: false,
      dialect: `mysql`,
      models: [User, Logins]
    });

    try {
      await this.sequelize.sync({ force: false });
      console.log(`\x1b[32m`, `Successfully connected to the Database!`, `\x1b[0m`);
    } catch (e) {
      console.log(e);
      console.log(`\x1b[31m`, `Failed to connect to the Database!`, `\x1b[0m`);
    }
  }
}
