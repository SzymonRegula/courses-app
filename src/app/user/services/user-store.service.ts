import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  name$ = this.name$$.asObservable();
  isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    return this.userService.getUser().pipe(
      tap((response) => {
        this.name$$.next(response.result.name);
        this.isAdmin$$.next(response.result.role === 'admin' ? true : false);
      })
    );
  }
}
