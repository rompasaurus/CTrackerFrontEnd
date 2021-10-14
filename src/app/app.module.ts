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
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpIntercepterBasicAuthService } from './services/http/http-intercepter-basic-auth.service';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    ParkListComponent,
    RideListComponent,
    LoginComponent,
    LogoutComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true },ParkService,RideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
