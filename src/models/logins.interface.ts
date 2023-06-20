export enum LoginMethods {
  Password = `password`,
  Google = `google`,
  Facebook = `facebook`,
}

export default interface LoginsInterface {
  id: number;
  user_id: number;
  method: LoginMethods;
  date: Date;
}
