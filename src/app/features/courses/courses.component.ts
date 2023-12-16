import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses = mockedCoursesList.map((mockCourse) => {
    const formattedMockCourse = {
      ...mockCourse,
      creationDate: new Date(mockCourse.creationDate),
      authors: mockCourse.authors.map((id) => {
        const name =
          mockedAuthorsList.find((author) => author.id === id)?.name || '';
        return name;
      }),
    };
    return formattedMockCourse;
  });
  editable: boolean = true;
  modalShown: boolean = true;

  modalAction(result: boolean) {
    console.log(result);
    result ? (this.modalShown = true) : (this.modalShown = false);
  }
}
