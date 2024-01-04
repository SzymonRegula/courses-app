import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '@app/services/error-handling.service';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '@app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {}

  usersUrl = environment.apiUrl + '/users';

  getUser() {
    return this.http
      .get<UserResponse>(`${this.usersUrl}/me`)
      .pipe(catchError(this.errorService.handleError));
  }
}
