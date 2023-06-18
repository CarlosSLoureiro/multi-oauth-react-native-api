import type User from "@models/user";

import { type AuthenticatedUser } from "@middlewares/authenticated.types";

import jwt from 'jsonwebtoken';

export default function getToken (user: User): string {
  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password
  };

  return jwt.sign(authenticatedUser, process.env.API_SECRET, { expiresIn: `7d` });
}
