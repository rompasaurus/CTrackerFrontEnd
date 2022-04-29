import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyRideModel, MyRideService } from 'src/app/services/myRide/my-ride.service';
import { ParkModel } from 'src/app/services/park/park.service';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';
@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {
  myRideAddForm!: FormGroup;
  isError!: boolean;
  myRideModel!: MyRideModel;
  myRideModelList: MyRideModel[] = [];
  parkSelect!:ParkModel;
  rideSelect !: RideModel;
  citySelect!: string;
  countrySelect!: string;
  stateSelect!: string;
  showParkSelector: boolean = true;
  showRideSelector: boolean = false;
  parkRideList!: RideModel[];
  rideCountMap: Map<string,number> = new Map();
  todaysDate: Date = new Date();
  userName: string = "";

  constructor(private myRideService: MyRideService,private rideService:RideService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(){
    this.myRideAddForm = new FormGroup({
      country : new FormControl(''),
      city : new FormControl(''),
      state : new FormControl(''),
      rideId: new FormControl('', Validators.required),
      timesRode: new FormControl('', Validators.required),
      dateRode: new FormControl('', Validators.required),
      lastRode: new FormControl('', Validators.required),
      parkId: new FormControl('', Validators.required)
    });
    this.userName = this.authService.getUserName();
  }
  onParkSelected(park:ParkModel){
    this.parkSelect = park;
    this.myRideAddForm.get('parkId')?.setValue(this.parkSelect.id);
    this.showParkSelector = false;
    this.showRideSelector = true;
    this.rideCountMap = new Map();
    this.pullRideListData();
  }
  switchToParkView(){
    this.showParkSelector = true;
    this.showRideSelector = false;
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
  addToRideCount(parkRide:RideModel,count:number){
    if(this.rideCountMap.has(parkRide.name)){
      if(this.rideCountMap.get(parkRide.name) == 1 && count < 0){
        console.log("Removing ride");
        this.rideCountMap.delete(parkRide.name)
      }else{
        this.rideCountMap.set(parkRide.name,this.rideCountMap.get(parkRide.name) + count);
      }
    }else{
      if(count>0) this.rideCountMap.set(parkRide.name,count);
    }
    console.log("rideCountMap: ", this.rideCountMap)
  }
  pullRideListData(){
    console.log("Pulling Ride List Data ParkID: ",this.parkSelect.id);
    if(this.parkSelect){
      this.rideService.getAllRidesByPark(this.parkSelect.id).subscribe(
        data => {
          this.parkRideList = data;
          this.parkRideList.forEach(element => {
            console.log(element);
          });
        }
      )
    }
  }
  addVisit(){
    console.log("park selected: ",this.parkSelect);
    console.log("userName: ",this.userName)
    console.log("authService: ",this.authService);
    this.myRideAddForm.markAllAsTouched(); 
    if( this.rideCountMap){
      this.rideCountMap.forEach((value ,key) => {
        let newRide = new MyRideModel();
        newRide.park = this.parkSelect;
        newRide.timesRode = value,
        newRide.ride = this.parkRideList.find(element => element.name == key)
        newRide.lastRode = this.myRideAddForm.get('dateRode').value ? this.myRideAddForm.get('dateRode').value : new Date();
        newRide.userName = this.userName;
        newRide.rideId = newRide.ride?.id;
        newRide.parkId = this.parkSelect.id;
        console.log("adding ride",newRide);
        this.myRideService.addRide(newRide)
        .subscribe(data => {
          //this.router.navigate(['/rides']);
          window.location.reload();
        }, error => {
          console.log(error);
          this.toastr.error('Ride Failed to add please try again');
        });
      });
    }else{
      this.toastr.error('This form is missing something not sure what but you should figure it out');
    }
  }
}

