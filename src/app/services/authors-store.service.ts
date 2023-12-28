import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthorsService } from './authors.service';
import { Author } from '@app/models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private authors$$ = new BehaviorSubject<Author[]>([]);
  authors$ = this.authors$$.asObservable();

  constructor(private authorsService: AuthorsService) {}

  getAll() {
    return this.authorsService.getAll().pipe(
      tap((response) => {
        this.authors$$.next(response.result);
      })
    );
  }

  createAuthor(authorName: string) {
    return this.authorsService
      .createAuthor(authorName)
      .pipe(tap(() => this.getAll().subscribe()));
  }

  getAuthor(id: string) {
    return this.authorsService.getAuthor(id);
  }
}
