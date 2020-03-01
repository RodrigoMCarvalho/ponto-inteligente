import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components/logar.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LoginModule { }
