import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, Sort, MatSort, MatPaginator } from '@angular/material';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
      .subscribe(
        data => {
          const lancamentos = data['data'] as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = 'Erro para obter os lancamentos.'
          this.snackBar.open(msg, "Erro", { duration: 3000 });
        }
      )
  }

}
