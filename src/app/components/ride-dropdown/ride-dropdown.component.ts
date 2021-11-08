import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Park } from 'src/app/common/park';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';
import { ParkDropdownComponent } from '../park-dropdown/park-dropdown.component';

@Component({
  selector: 'app-ride-dropdown',
  templateUrl: './ride-dropdown.component.html',
  styleUrls: ['./ride-dropdown.component.css']
})
export class RideDropdownComponent implements OnInit {
  rides!:RideModel[];
  @Input() parkId!: number;
  @Output() rideSelected = new EventEmitter<RideModel>();
  rideSelect!:FormGroup;


  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.pullRideListData();
    this.rideSelect = new FormGroup({
      rideControl : new FormControl('')
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pullRideListData();
  }
  
  pullRideListData(){
    if(this.parkId){
      this.rideService.getAllRidesByPark(this.parkId).subscribe(
        data => {
          this.rides = data;
          this.rides.forEach(element => {
            console.log(element);
          });
        }
      )
    }else{
      this.rideService.getAllRides().subscribe(
        data => {
          this.rides = data;
          this.rides.forEach(element => {
            console.log(element);
          });
        }
      )
    }
  }
  updateSelectedRide(){
    let selectedRide = this.rideSelect.get('rideControl').value;
    console.log("New ride selected: ",selectedRide)
    this.rideSelected.emit(selectedRide);
  }
}

