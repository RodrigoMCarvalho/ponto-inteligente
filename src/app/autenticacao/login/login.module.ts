import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components/logar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule, MatIconModule, MatListModule, MatSnackBarModule } from "@angular/material";
import {MatTooltipModule} from '@angular/material/tooltip';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    LoginComponent,
    LogarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    FlexLayoutModule
  ]
})
export class LoginModule { }
