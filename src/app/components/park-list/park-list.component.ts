import { Component, OnInit } from '@angular/core';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.css']
})
export class ParkListComponent implements OnInit {
  parks!: ParkModel[];
  
  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullParkListData();
  }

  pullParkListData(){
    console.log("Pulling Park List Data ");
    this.parkService.getParkListSortedByName().subscribe(
      data => {
        this.parks = data;
        this.parks.forEach(element => {
          //console.log(element);
        });
      }
    )
  }

}
