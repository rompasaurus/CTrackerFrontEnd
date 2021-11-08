import { Component, OnInit } from '@angular/core';
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
    this.myRideService.getAllRides(this.authService.getUserName()).subscribe(
      data => {
        this.myRides = data;
        this.myRides.forEach(element => {
          console.log(element);
        });
      }
    )
  }

}
