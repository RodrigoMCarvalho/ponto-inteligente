import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuncionarioComponent } from './components/funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatListModule, MatInputModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatPaginatorIntl } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';



@NgModule({
  declarations: [
    ListagemComponent,
    LancamentoComponent,
    FuncionarioComponent  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl}
  ]
})
export class FuncionarioModule { }
