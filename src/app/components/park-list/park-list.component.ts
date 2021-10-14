import { Component, OnInit } from '@angular/core';
import { Park } from 'src/app/common/park';
import { ParkService } from 'src/app/services/park.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.css']
})
export class ParkListComponent implements OnInit {
  parks!: Park[];
  
  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullParkListData();
  }

  pullParkListData(){
    this.parkService.getParkList().subscribe(
      data => {
        this.parks = data;
      }
    )
  }

}
