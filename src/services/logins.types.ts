import type Logins from "@models/logins";
import type User from "@models/user";

export type UserLoginsResponse = { user: Pick<User, 'name' | 'picture'> } & Pick<Logins, "method" | "date">;
