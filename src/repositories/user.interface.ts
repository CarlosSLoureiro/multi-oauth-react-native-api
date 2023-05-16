import type User from '@models/user';
import type UserInterface from '@models/user.interface';

export default interface UserRepositoryInterface {
  create: (user: UserInterface) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | null>;
}
