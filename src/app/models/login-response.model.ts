import { User } from './users.model'

export interface LoginResponse {
    token: string;
    user: User; // Include the User object as well if needed
  }
  