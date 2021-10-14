import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ParkListComponent } from './components/park-list/park-list.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'welcome', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'parks', component: ParkListComponent, canActivate:[RouteGuardService]},
  { path: 'rides', component: RideListComponent, canActivate:[RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },

  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
