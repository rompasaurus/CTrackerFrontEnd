import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkListComponent } from './components/park-list/park-list.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { ParkService } from './services/park/park.service';
import { RideService } from './services/ride/ride.service';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { ParkAddFormComponent } from './components/park-add-form/park-add-form/park-add-form.component';
import { RideAddFormComponent } from './components/ride-add-form/ride-add-form/ride-add-form.component';
import { RideDropdownComponent } from './components/ride-dropdown/ride-dropdown.component';
import { ParkDropdownComponent } from './components/park-dropdown/park-dropdown.component';
import { MyRideListComponent } from './components/my-ride-list/my-ride-list.component';
import { MyRideAddFormComponent } from './components/my-ride-add-form/my-ride-add-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RcdbScrapeComponent } from './components/rcdb-scrape/rcdb-scrape.component';
import { CountryDropdownComponent } from './components/country-dropdown/country-dropdown.component';
import { CityDropdownComponent } from './components/city-dropdown/city-dropdown.component';
import { StateDropdownComponent } from './components/state-dropdown/state-dropdown.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { PasswordResetEmailSetupFormComponent } from './components/password-reset-email-setup-form/password-reset-email-setup-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { VisitFormComponent } from './components/visit-form/visit-form.component';
import { MyRideListByParkComponent } from './components/my-ride-list-by-park/my-ride-list-by-park.component';
import { MyRideListByRideComponent } from './components/my-ride-list-by-ride/my-ride-list-by-ride.component';


@NgModule({
  declarations: [
    AppComponent,
    ParkListComponent,
    RideListComponent,
    LogoutComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    ParkAddFormComponent,
    RideAddFormComponent,
    RideDropdownComponent,
    ParkDropdownComponent,
    MyRideListComponent,
    MyRideAddFormComponent,
    ProfileComponent,
    RcdbScrapeComponent,
    CountryDropdownComponent,
    CityDropdownComponent,
    StateDropdownComponent,
    PasswordResetFormComponent,
    PasswordResetEmailSetupFormComponent,
    VisitFormComponent,
    MyRideListByParkComponent,
    MyRideListByRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    HttpClientModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatOptionModule, 
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, ParkService, RideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
