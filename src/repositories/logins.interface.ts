import type Logins from '@models/logins';
import type LoginsInterface from '@models/logins.interface';

export default interface LoginsRepositoryInterface {
  create: (loginData: Omit<LoginsInterface, "id">) => Promise<Logins>;
}
