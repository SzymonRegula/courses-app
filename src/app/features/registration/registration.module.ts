import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, SharedModule],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
