import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AtualizacaoComponent } from './atualizacao/atualizacao.component';
import { ListagemComponent } from './listagem/listagem.component';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path:'',
        component: ListagemComponent
      },
      {
        path:'cadastro',
        component: CadastroComponent
      },
      {
        path:'atualizacao/:lancamentoId',
        component: AtualizacaoComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
