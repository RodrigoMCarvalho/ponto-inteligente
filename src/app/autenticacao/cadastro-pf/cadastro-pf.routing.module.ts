import { Routes, RouterModule } from '@angular/router';
import { CadastroPfComponent } from './components/cadastro-pf.component';
import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';
import { NgModule } from '@angular/core';

export const CadastroPfRoutes: Routes = [
  {
    path: 'cadastro-pf',
    component: CadastroPfComponent,
    children: [
      {
        path:'',
        component: CadastrarPfComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CadastroPfRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CadastroPfRoutingModule {

}
