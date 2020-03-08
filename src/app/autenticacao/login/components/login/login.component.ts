import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login: Login;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  logar() {
    if (this.form.invalid) {
      this.snackBar.open("Dados inválidos", "Erro", { duration: 5000 });
      return;
    }
    this.login = this.form.value;
    this.loginService.logar(this.login).subscribe(
      data => {
        console.log(data);
        localStorage['token'] = data['data']['token'];
        const usuarioData = JSON.parse(
          atob(data['data']['token'].split('.')[1])
        );
        console.log(usuarioData);
        if (usuarioData['role'] == 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/funcionario']);
        }
    }, err => {
      console.log(err);
      let msg: string = 'Tente novamente em instantes.'
      if (err['status'] == 401) {
        msg = 'Email e/ou senha inválidos.'
      }
      this.snackBar.open(msg, 'Erro', { duration: 3000 });
    });
  }

}
