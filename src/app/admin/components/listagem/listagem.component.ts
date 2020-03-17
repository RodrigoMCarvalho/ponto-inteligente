import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { FormBuilder } from '@angular/forms';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';

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

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpUtil: HttpUtilService
  ) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirLancamentos();
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    this.funcionarioId = '2';
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
