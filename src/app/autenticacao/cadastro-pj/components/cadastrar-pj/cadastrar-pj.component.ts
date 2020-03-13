import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CadastroPj } from '../../models/cadastro-pj.model';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CadastroPjService } from '../../services/cadastro-pj.service';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent  implements OnInit {

  form: FormGroup;
  cadastroPj: CadastroPj;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private service: CadastroPjService) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome:        ['', [Validators.required, Validators.minLength(3)]],
      email:       ['', [Validators.required, Validators.email]],
      senha:       ['', [Validators.required, Validators.minLength(6)]],
      cpf:         ['', [Validators.required, CpfValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj:        ['', [Validators.required, CnpjValidator]]
    })
  }

  cadastrarPj() {
    if (this.form.invalid) {
      return;
    }
    this.cadastroPj = this.form.value;
    this.service.cadastrar(this.cadastroPj).subscribe(
      data => {
        const msg: string = "Cadastro realizado com sucesso.";
        this.snackBar.open(msg, "Sucesso", { duration: 3000 });
        this.router.navigate(['/login']);
      },
      err => {
        let msg: string = "Tente novamente mais tarde.";
        if(err.status == 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, "Erro", { duration: 3000 });
      }
    );
    return false;
  }

}
