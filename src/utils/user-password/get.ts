import bcrypt from 'bcryptjs';

export default function getHashedUserPassword (password: string): string {
  return bcrypt.hashSync(password + process.env.API_SECRET, bcrypt.genSaltSync(10));
}
