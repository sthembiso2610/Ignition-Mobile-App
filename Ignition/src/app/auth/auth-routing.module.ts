import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
 
  {
    path: 'login',
    loadChildren: () => import('./loging/loging.module').then( m => m.LogingPageModule)
  },
  {
    path: 'registration',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
