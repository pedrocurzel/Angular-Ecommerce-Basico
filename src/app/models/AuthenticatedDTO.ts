export default class AuthenticatedDTO {
  id?: number;
  name?: string;
  email?: string;
  token?: string;
}

export class LoginDTO {
  Email?: string;
  Password?: string;
}