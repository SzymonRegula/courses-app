import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  userName$: Observable<string | null> = this.userStore.name$;

  constructor(private userStore: UserStoreService) {}

  ngOnInit() {
    this.userStore.getUser().subscribe();
  }
}
