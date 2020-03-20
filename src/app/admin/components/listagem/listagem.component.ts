import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent, Sort, MatSelect } from '@angular/material';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', "acao"];
  funcionarioId: string;
  totalLancamentos: number;
  funcionarios: Funcionario[];

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    })
  }

  get funcId(): string {
    return sessionStorage['funcionarioId'] || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id != usuarioId);

          if(this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg: string = "Erro para obter funcionário.";
          this.snackBar.open(msg, "Erro", { duration: 3000 });
        }
      );
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    if(this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected['value'];
    } else if(this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage['funcionarioId'] = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
            this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];   //realiza um cast para Lancamento
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg: string = 'Erro para obter lançamentos.'
          this.snackBar.open(msg, "Erro", { duration: 3000 });
        }
      )
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if(sort.direction == '') {
      this.ordemPadrao()
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();  //API trabalha com letras maiusculas
    }
    this.exibirLancamentos();
  }


}
