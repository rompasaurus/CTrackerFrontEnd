import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ride } from './common/ride';
import { ParkListComponent } from './components/park-list/park-list.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { ParkService } from './services/park.service';
import { RideService } from './services/ride.service';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpIntercepterBasicAuthService } from './services/http/http-intercepter-basic-auth.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    ParkListComponent,
    RideListComponent,
    LogoutComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },ParkService,RideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
