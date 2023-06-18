import { type UserDataResponseInterface } from "./auth.types";

export type UserResponseInterface = UserDataResponseInterface;

export type UserChangePasswordResponseInterface = Pick<UserDataResponseInterface, "token">;
