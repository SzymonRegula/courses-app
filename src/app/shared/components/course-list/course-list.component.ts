import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;
  @Output() deleteCourseEvent = new EventEmitter<Course>();
  @Output() editCourseEvent = new EventEmitter<Course>();

  deleteCourse(course: Course) {
    this.deleteCourseEvent.emit(course);
  }

  editCourse(course: Course) {
    this.editCourseEvent.emit(course);
  }
}
