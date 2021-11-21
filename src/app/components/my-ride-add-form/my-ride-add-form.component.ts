import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ride } from 'src/app/common/ride';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyRideModel, MyRideService } from 'src/app/services/myRide/my-ride.service';
import { ParkModel } from 'src/app/services/park/park.service';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';
import { ParkDropdownComponent } from '../park-dropdown/park-dropdown.component';

@Component({
  selector: 'app-my-ride-add-form',
  templateUrl: './my-ride-add-form.component.html',
  styleUrls: ['./my-ride-add-form.component.css'],
})
export class MyRideAddFormComponent implements OnInit {
    myRideAddForm!: FormGroup;
    isError!: boolean;
    myRideModel!: MyRideModel;
    parkSelect!:ParkModel;
    rideSelect !: RideModel;
    citySelect!: string;
    countrySelect!: string;
    stateSelect!: string;
  
  
    constructor(private myRideService: MyRideService, private activatedRoute: ActivatedRoute,
      private router: Router, private toastr: ToastrService, private authService: AuthService) { }
  
    ngOnInit(){
      this.myRideAddForm = new FormGroup({
        country : new FormControl(''),
        city : new FormControl(''),
        state : new FormControl(''),
        rideId: new FormControl('', Validators.required),
        timesRode: new FormControl('', Validators.required),
        firstRode: new FormControl('', Validators.required),
        lastRode: new FormControl('', Validators.required),
        rankInPark: new FormControl('', Validators.required),
        rankOverall: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required),
        parkId: new FormControl('', Validators.required)
      });
    }
    onParkSelected(park:ParkModel){
      this.parkSelect = park;
      this.myRideAddForm.get('parkId')?.setValue(this.parkSelect.id);
    }
    onRideSelected(ride:RideModel){
      this.rideSelect = ride;
      this.myRideAddForm.get('rideId')?.setValue(this.rideSelect.id);
    }
    onCitySelected(city:string){
      this.citySelect = city;
      this.myRideAddForm.get('city')?.setValue(this.citySelect);
    }
    onCountrySelected(country:string){
      this.countrySelect = country;
      this.myRideAddForm.get('country')?.setValue(this.countrySelect);
    }
    onStateSelected(state:string){
      this.stateSelect = state;
      this.myRideAddForm.get('stateSelect')?.setValue(this.stateSelect);
    }
    addRide(){
      console.log("park selected: ",this.parkSelect);
      console.log("rideAddForm: ",this.myRideAddForm);
      this.myRideAddForm.markAllAsTouched(); 
      if(this.myRideAddForm.status == "VALID"){
        this.myRideModel = new RideModel();
        this.myRideModel.userName = this.authService.getUserName();
        this.myRideModel.rideId = this.myRideAddForm.get('rideId').value;
        this.myRideModel.timesRode = this.myRideAddForm.get('timesRode').value;
        this.myRideModel.firstRode = this.myRideAddForm.get('firstRode').value;
        this.myRideModel.lastRode = this.myRideAddForm.get('lastRode').value;
        this.myRideModel.rankInPark = this.myRideAddForm.get('rankInPark').value;
        this.myRideModel.rankOverall = this.myRideAddForm.get('rankOverall').value;
        this.myRideModel.rating = this.myRideAddForm.get('rating').value;
        this.myRideModel.parkId = this.parkSelect.id;
        console.log("adding ride model: ",this.myRideModel);
        this.myRideService.addRide(this.myRideModel)
          .subscribe(data => {
            //this.router.navigate(['/rides']);
            window.location.reload();
          }, error => {
            console.log(error);
            this.toastr.error('Ride Failed to add please try again');
          });
      }else{
        this.toastr.error('This form is missing something not sure what by you should figure it out');
      }
    }
  
  }
  
