import bcrypt from 'bcryptjs';

export default function matchPassword (inputedPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(inputedPassword + process.env.API_SECRET, hashedPassword);
}
