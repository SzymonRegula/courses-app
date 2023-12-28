import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { authorValidator } from '@app/shared/utils/author.validator';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CourseRequest } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorsStoreService } from '@app/services/authors-store.service';
import { AuthorResponse } from '@app/models/author.model';

enum Mode {
  Add,
  Edit,
  Show,
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  mode: Mode = Mode.Show;
  courseForm!: FormGroup;
  showAuthorErrorMessage = false;
  authorsIds: string[] = [];
  header: string = 'Course';

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService,
    private route: ActivatedRoute,
    private authorsStore: AuthorsStoreService
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      newAuthor: this.fb.group({
        author: [''],
        authors: this.fb.array([]),
      }),
      duration: ['', [Validators.required, Validators.min(0)]],
    });

    if (this.route.snapshot.url[0].path === 'add') {
      this.mode = Mode.Add;
      this.header = 'Create Course';
    } else if (this.route.snapshot.url[0].path === 'edit') {
      this.mode = Mode.Edit;
      this.header = 'Edit Course';
    } else {
      this.mode = Mode.Show;
      this.header = 'Course';
      this.courseForm.disable();
    }

    if (this.mode !== Mode.Add) {
      this.coursesStore.getCourse(this.route.snapshot.params['id']).subscribe({
        next: (response) => {
          const course = response.result;
          this.courseForm.reset({
            title: course.title,
            description: course.description,
            newAuthor: {
              author: '',
              authors: [],
            },
            duration: course.duration,
          });
          this.authorsStore.getAll().subscribe((authors) => {
            authors.result.forEach((author) => {
              if (course.authors.includes(author.id)) {
                this.authors.push(this.fb.control(author.name));
              }
            });
          });
          this.authorsIds = course.authors;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onCreateAuthor() {
    if (authorValidator(this.author!) === null) {
      this.authorsStore.createAuthor(this.author.value).subscribe({
        next: (response) => {
          this.authors.push(this.fb.control(this.author.value));
          const authorsId = (response as AuthorResponse).result.id;
          this.authorsIds.push(authorsId);
          this.showAuthorErrorMessage = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.showAuthorErrorMessage = true;
    }
  }

  onDeleteAuthor(index: number) {
    this.authors.removeAt(index);
    this.authorsIds.splice(index, 1);
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const courseRequest: CourseRequest = {
      title: this.title?.value,
      description: this.description?.value,
      duration: this.duration?.value,
      authors: this.authorsIds,
    };

    console.log(courseRequest);

    if (this.mode === Mode.Add) {
      this.coursesStore.createCourse(courseRequest).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else if (this.mode === Mode.Edit) {
      this.coursesStore
        .editCourse(this.route.snapshot.params['id'], courseRequest)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  get title() {
    return this.courseForm.get('title');
  }
  get description() {
    return this.courseForm.get('description');
  }
  get author() {
    return this.courseForm.get('newAuthor.author') as FormControl;
  }
  get authors() {
    return this.courseForm.get('newAuthor.authors') as FormArray;
  }
  get duration() {
    return this.courseForm.get('duration');
  }
}
