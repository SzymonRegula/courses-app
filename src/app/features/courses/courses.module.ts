import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
