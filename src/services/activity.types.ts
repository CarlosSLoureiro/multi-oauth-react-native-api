import type Activity from "@models/activity";
import type User from "@models/user";

export type UserActivityResponse = { user: Pick<User, 'name' | 'picture'> } & Pick<Activity, "message" | "date">;

export enum Activities {
  LOGIN_WITH_PASSWORD = `Has logged in using his own password`,
  LOGIN_WITH_GOOGLE = `Has logged in using his Google account`,
  NEW_PASSWORD = `Has created a new password to his account`,
}
