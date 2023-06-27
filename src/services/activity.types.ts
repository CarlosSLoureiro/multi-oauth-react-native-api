import type Activity from "@models/activity";
import type User from "@models/user";

export type UserActivityResponse = { user: Pick<User, 'name' | 'picture'> } & Pick<Activity, "id" | "message" | "date">;

export enum Activities {
  LOGIN_WITH_PASSWORD = `Has logged in using his own password.`,
  LOGIN_WITH_PROVIDER = `Has logged in using his @provider account.`,
  NEW_PASSWORD = `Has created a new password to his account.`,
}
