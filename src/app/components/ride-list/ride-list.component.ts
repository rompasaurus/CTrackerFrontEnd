import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/common/ride';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {
  rides!: RideModel[];
  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.pullRideListData();
  }

  pullRideListData(){
    console.log("pullRideListData Gettind all ridess ");
    this.rideService.getAllRidesSortedByRideName().subscribe(
      data => {
        this.rides = data;
        this.rides.forEach(element => {
          //console.log(element);
        });
      }
    )
  }

}
