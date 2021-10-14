import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/common/ride';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {
  rides!: Ride[];
  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.pullRideListData();
  }

  pullRideListData(){
    this.rideService.getRideList().subscribe(
      data => {
        this.rides = data;
      }
    )
  }

}
