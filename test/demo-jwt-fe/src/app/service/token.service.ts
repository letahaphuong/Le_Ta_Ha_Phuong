import {Injectable} from '@angular/core';

const TOKEN_KEY = 'Token_key';
const NAME_KEY = 'Name_key';
const AVATAR_KEY = 'Avatar_key';
const ROLE_KEY = 'Role_key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public roles = [];

  constructor() {
  }

  public setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setName(name: string): void {
    localStorage.removeItem(NAME_KEY);
    localStorage.setItem(NAME_KEY, name);
  }

  public getName(): string | null {
    return localStorage.getItem(NAME_KEY);
  }

  public setAvatar(avatar: string): void {
    localStorage.removeItem(AVATAR_KEY);
    localStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatar(): string | null {
    return localStorage.getItem(AVATAR_KEY);
  }

  public setRole(roles: string[]): void {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }


  public getRole(): string[] {
    if (this.getToken()) {
      // @ts-ignore
      JSON.parse(localStorage.getItem(ROLE_KEY) as string).forEach(role => {
        // @ts-ignore
        this.roles.push(role.authority);
      });
    }
    return this.roles;
  }
}
