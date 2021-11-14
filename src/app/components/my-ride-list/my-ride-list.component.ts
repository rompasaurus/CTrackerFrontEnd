import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/common/ride';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyRideModel, MyRideService } from 'src/app/services/myRide/my-ride.service';

@Component({
  selector: 'app-my-ride-list',
  templateUrl: './my-ride-list.component.html',
  styleUrls: ['./my-ride-list.component.css']
})
export class MyRideListComponent implements OnInit {
  myRides !: MyRideModel[];
  constructor(private myRideService: MyRideService, private authService : AuthService) { }

  ngOnInit(): void {
    this.pullMyRideListData();
  }
  pullMyRideListData(){
    console.log("Pulling ride list data ");
    this.myRideService.getAllRides(this.authService.getUserName()).subscribe(
      data => {
        this.myRides = data;
        this.myRides.forEach(element => {
          //console.log(element);
        });
      }
    )
  }
  deleteMyRide(rideId:number){
    console.log("Delete Clicked for id: ", rideId);
    let response = this.myRideService.deleteMyRide(rideId).subscribe();
    window.location.reload();
    console.log(response);
  }

}
