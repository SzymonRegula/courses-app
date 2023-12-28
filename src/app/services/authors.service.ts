import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { AllAuthorsResponse, AuthorResponse } from '@app/models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {}

  authorsUrl = environment.apiUrl + '/authors';

  getAll() {
    return this.http
      .get<AllAuthorsResponse>(`${this.authorsUrl}/all`)
      .pipe(catchError(this.errorService.handleError));
  }

  createAuthor(authorName: string) {
    const request = { name: authorName };
    return this.http
      .post(`${this.authorsUrl}/add`, request)
      .pipe(catchError(this.errorService.handleError));
  }

  getAuthor(id: string) {
    return this.http
      .get<AuthorResponse>(`${this.authorsUrl}/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }
}
