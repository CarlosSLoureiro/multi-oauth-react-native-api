import bcrypt from 'bcryptjs';

export default function getHashedUserPassword (passowrd: string): string {
  return bcrypt.hashSync(passowrd + process.env.API_SECRET, bcrypt.genSaltSync(10));
}
