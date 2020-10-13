import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';


const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
 
  {
    path: 'login',
    loadChildren: () => import('./loging/loging.module').then( m => m.LogingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
