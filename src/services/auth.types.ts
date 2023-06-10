export interface UserDataResponseInterface {
  id: number;
  name: string;
  email: string;
  picture: string;
  token: string;
}

export interface AuthResponseInterface {
  action: string;
  data: UserDataResponseInterface;
}
