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
      rankInPark: new FormControl('', Validators.required),
      rankOverall: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      parkId: new FormControl('', Validators.required)
    });
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
    let newRide = new MyRideModel();
    let containsRide = false;
    newRide.park = parkRide.park
    newRide.timesRode = count;
    newRide.ride = parkRide;
    if(this.rideCountMap.has(parkRide.name)){
      if(this.rideCountMap.get(parkRide.name) == 0 && count < 0){
        console.log("Can't have a negative ride count");
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
  addRide(){
    console.log("park selected: ",this.parkSelect);
    console.log("rideAddForm: ",this.myRideAddForm);
    this.myRideAddForm.markAllAsTouched(); 
    if(this.myRideAddForm.status == "VALID"){
      this.myRideModel = new RideModel();
      this.myRideModel.userName = this.authService.getUserName();
      this.myRideModel.rideId = this.myRideAddForm.get('rideId').value;
      this.myRideModel.timesRode = this.myRideAddForm.get('timesRode').value;
      this.myRideModel.firstRode = this.myRideAddForm.get('dateRode').value;
      this.myRideModel.lastRode = this.myRideAddForm.get('dateRode').value;
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
      this.toastr.error('This form is missing something not sure what but you should figure it out');
    }
  }

}

