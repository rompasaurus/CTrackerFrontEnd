import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-park-dropdown',
  templateUrl: './park-dropdown.component.html',
  styleUrls: ['./park-dropdown.component.css']
})
export class ParkDropdownComponent implements OnInit {
  parks!:ParkModel[];
  @Output() parkSelected = new EventEmitter<ParkModel>();
  parkSelect!: FormGroup;

  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullParkListData();
    this.parkSelect = new FormGroup({
      parkControl : new FormControl('')
    })
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

  updateSelectedPark(){
    let selectedPark = this.parkSelect.get('parkControl').value;
    console.log("New park selected: ",selectedPark)
    this.parkSelected.emit(selectedPark);
  }
}
