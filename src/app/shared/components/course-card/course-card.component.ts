import { Component, Input, OnInit } from '@angular/core';
import { Author, AuthorResponse } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { AuthorsStoreService } from '@app/services/authors-store.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course?: Course;
  @Input() editable: boolean = false;
  authorsNames: string[] = [];

  constructor(private authorsStore: AuthorsStoreService) {}

  ngOnInit() {
    if (this.course) {
      this.authorsStore.getAll().subscribe((authors) => {
        this.authorsNames = authors.result
          .filter((author) => this.course?.authors.includes(author.id))
          .map((author) => author.name);
      });
    }
  }
}
