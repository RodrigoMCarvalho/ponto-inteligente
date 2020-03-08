import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CadastroPf } from '../../models/cadastro-pf.model';
import { CadastrarPfService } from '../../service/cadastrar-pf.service';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;
  cadastroPf: CadastroPf;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private service: CadastrarPfService
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome:  ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      cpf:   ['', [Validators.required, CpfValidator]],
      cnpj:  ['', [Validators.required, CnpjValidator]]
    })
  }

  cadastrarPf() {
    if(this.form.invalid) {
      return;
    }
    this.cadastroPf = this.form.value
    this.service.cadastrar(this.cadastroPf)
        .subscribe(
          data => {
            const msg: string  = "Cadastro realizado com sucesso.";
            this.snackBar.open(msg, "Sucesso", { duration: 3000 });
            this.router.navigate(['/login']);
          },
          err => {
            let msg: string  = "Tente novamente mais tarde.";
            if(err.status == 400) {
              msg = err.error.errors.join('');
            }
            this.snackBar.open(msg, "Erro", { duration: 3000 });
          }
        );
        return false;
  }

}
