import { Component, Input } from '@angular/core';
import { Course } from '@app/shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course?: Course;
  @Input() editable: boolean = false;
}
