import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './components/listagem/listagem.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './components/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatListModule, MatSelectModule, MatTableModule, MatTooltipModule, MatIconModule, MatSnackBarModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { LancamentoService } from '../shared/services/lancamento.service';
import { HttpUtilService } from '../shared/services/http-util.service';
import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';


@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule
  ],
  providers: [
    LancamentoService,
    HttpUtilService,
    MatPaginatorIntl,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ],
})
export class AdminModule { }
