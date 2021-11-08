import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyRideAddFormComponent } from './components/my-ride-add-form/my-ride-add-form.component';
import { MyRideListComponent } from './components/my-ride-list/my-ride-list.component';
import { ParkAddFormComponent } from './components/park-add-form/park-add-form/park-add-form.component';
import { ParkListComponent } from './components/park-list/park-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RideAddFormComponent } from './components/ride-add-form/ride-add-form/ride-add-form.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent  },//canActivate, RouteGuardService
  { path: 'welcome', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'parks', component: ParkListComponent, canActivate:[AuthGuard]},
  { path: 'rides', component: RideListComponent, canActivate:[AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'user-profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'addMyRide', component: MyRideAddFormComponent, canActivate:[AuthGuard] },
  { path: 'myRides', component: MyRideListComponent, canActivate:[AuthGuard] },
  { path: 'addRide', component: RideAddFormComponent, canActivate:[AuthGuard] },
  { path: 'addPark', component: ParkAddFormComponent, canActivate:[AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
