import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import { UserRequest } from '@app/models/user.model';
import { ErrorHandlingService } from '@app/services/error-handling.service';

type LoginResponse = {
  successful: boolean;
  result: string;
  user: {
    name: string | null;
    email: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorized$$.asObservable();
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private errorService: ErrorHandlingService
  ) {
    const token = this.sessionStorageService.getToken();
    if (token) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: UserRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized$$.next(true);
      }),
      catchError(this.errorService.handleError)
    );
  }

  register(user: UserRequest) {
    return this.http
      .post(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.errorService.handleError));
  }

  logout() {
    return this.http.delete(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
      }),
      catchError(this.errorService.handleError)
    );
  }
}
