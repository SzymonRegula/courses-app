import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DurationPipe } from './pipes/duration.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
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
import { RouterModule } from '@angular/router';

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
const PIPES = [DurationPipe, CreationDatePipe];

const DECLARATIONS = [...COMPONENTS, ...DIRECTIEVS, ...PIPES];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: DECLARATIONS,
})
export class SharedModule {}
