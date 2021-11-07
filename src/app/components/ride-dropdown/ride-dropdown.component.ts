import { Component, Input, OnInit } from '@angular/core';
import { Park } from 'src/app/common/park';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-ride-dropdown',
  templateUrl: './ride-dropdown.component.html',
  styleUrls: ['./ride-dropdown.component.css']
})
export class RideDropdownComponent implements OnInit {
  parks!:ParkModel[];
  @Input() park!: ParkModel;

  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullParkListData();
  }
  
  pullParkListData(){
    this.parkService.getParkListSortedByName().subscribe(
      data => {
        this.parks = data;
        this.parks.forEach(element => {
          console.log(element);
        });
      }
    )
  }
}
function input() {
  throw new Error('Function not implemented.');
}

