import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ride } from 'src/app/common/ride';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyRideModel, MyRideService } from 'src/app/services/myRide/my-ride.service';
import { ParkModel } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-my-ride-list',
  templateUrl: './my-ride-list.component.html',
  styleUrls: ['./my-ride-list.component.css']
})
export class MyRideListComponent implements OnInit {
  myRides !: MyRideModel[];
  constructor(private myRideService: MyRideService,private toastr: ToastrService, private authService : AuthService) { }
  ride: boolean = true;
  park: boolean = false;
  visit: boolean = false;
  myParks: ParkModel[] = [];

  ngOnInit(): void {
    this.pullMyRideListData();
  }
  pullMyRideListData(){
    console.log("Pulling ride list data ");
    this.myRideService.getAllRides(this.authService.getUserName()).subscribe(
      data => {
        this.myRides = data;
        this.myRides.forEach(element => {
          this.myParks.push(element.park);
        });
        //select only the distinct elements of my parks
        this.myParks = this.myParks.reduce((unique, o) => {
          if(!unique.some(obj => obj.id === o.id)) {
            unique.push(o);
            console.log(o);
          }
          return unique;
      },[]);
      }
      
    )
  }
  deleteMyRide(rideId:number){
    console.log("Delete Clicked for id: ", rideId);
    let response = this.myRideService.deleteMyRide(rideId).subscribe();
    window.location.reload();
    console.log(response);
  }
  
  toggle(component:string){
    console.log("Toggling view: ",component)
    switch (component) {
      case 'ride':
        this.ride = true;
        this.park = false;
        this.visit = false;
        break;
      case 'park':
        this.ride = false;
        this.park = true;
        this.visit = false;
        break;
      case 'visit':
        this.ride = false;
        this.park = false;
        this.visit = true;
        break;
      default:
        this.ride = true;
        this.park = false;
        this.visit = false;
        break;
    }
    console.log("My Parks: " + this.myParks)
    console.log("this.ride: ",this.ride, "this.park: ",this.park,"this.visit: ",this.visit)
  }

  addToRideCount(myRide:MyRideModel,count:number){
    console.log("calling add to ride count with myRide: ", myRide, " Count: ", count);
    myRide.timesRode = myRide.timesRode + count;
    this.myRideService.updateCount(myRide).subscribe(data => {
      this.toastr.success("Updated Ride count for: " + myRide.ride?.name)
    }, error => {
      console.log(error);
      this.toastr.error('Your ride  Failed to update please try again');
    });
  }

}
