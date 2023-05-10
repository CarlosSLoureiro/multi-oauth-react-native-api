
import GoogleAuth from './google';

export default abstract class Auth {
  public static config (): void {
    GoogleAuth.config();
  }
}
