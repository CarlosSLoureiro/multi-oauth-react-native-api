import type UserInterface from "@models/user.interface";

export type AuthenticatedUser = Pick<UserInterface, 'id' | 'name' | 'email'>;
