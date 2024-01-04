import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { windowToken } from './window.token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: windowToken, useValue: window }],
})
export class AuthModule {}
