import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  ModalComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  CourseListComponent,
} from './components';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  CourseListComponent,
];
const DIRECTIEVS = [EmailValidatorDirective];
const PIPES = [DurationPipe, CustomDatePipe];

const DECLARATIONS = [...COMPONENTS, ...DIRECTIEVS, ...PIPES];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: DECLARATIONS,
})
export class SharedModule {}
