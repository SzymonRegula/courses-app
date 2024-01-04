import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authorValidator } from '@app/shared/utils/author.validator';
import { FaIconLibrary, FaProps } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  showAuthorErrorMessage = false;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      newAuthor: this.fb.group({
        author: [''],
        authors: this.fb.array([]),
      }),
      duration: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onCreateAuthor() {
    if (authorValidator(this.author!) === null) {
      const author = this.fb.control(this.author?.value);
      this.authors.push(author);
      this.showAuthorErrorMessage = false;
    } else {
      this.showAuthorErrorMessage = true;
    }
  }

  onDeleteAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    console.log(this.courseForm.value);
  }

  get title() {
    return this.courseForm.get('title');
  }
  get description() {
    return this.courseForm.get('description');
  }
  get author() {
    return this.courseForm.get('newAuthor.author');
  }
  get authors() {
    return this.courseForm.get('newAuthor.authors') as FormArray;
  }
  get duration() {
    return this.courseForm.get('duration');
  }
}
