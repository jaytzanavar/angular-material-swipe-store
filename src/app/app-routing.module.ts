import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { TestformComponent } from './pages/testform/testform.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'test',
  component: TestformComponent,
  canActivate: [AuthenticationGuard],
  canDeactivate: [AuthenticationGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
