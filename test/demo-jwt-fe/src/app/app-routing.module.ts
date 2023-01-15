import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from './home/header/header.component';
import {RegisterComponent} from './form-login/register/register.component';
import {LoginComponent} from './form-login/login/login.component';

const routes: Routes = [
  {path: '', component: HeaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
