import { Inject, Injectable } from '@angular/core';
import { windowToken } from '../window.token';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(@Inject(windowToken) private window: Window) {}

  setToken(token: string) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
    this.window.sessionStorage.setItem('token', token);
  }

  getToken() {
    return this.window.sessionStorage.getItem('token') || '';
  }

  deleteToken() {
    this.window.sessionStorage.removeItem('token');
  }
}
