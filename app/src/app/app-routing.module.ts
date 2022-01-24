import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacheComponent } from './tache/tache.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
