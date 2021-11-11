import { Component, Directive, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-park-dropdown',
  templateUrl: './park-dropdown.component.html',
  styleUrls: ['./park-dropdown.component.css'],
})
export class ParkDropdownComponent implements OnInit {

  parks!:ParkModel[];
  @Input() rideId!: number;
  @Output() parkSelected = new EventEmitter<ParkModel>();
  parkSelect!: FormGroup;

  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullParkListData();
    this.parkSelect = new FormGroup({
      parkControl : new FormControl('')
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pullParkListData();
  }

  set(park: ParkModel) {
    console.log("Setting park value: ",park);
    this.parkSelect.get('parkControl')?.setValue(park);
  }
  
  pullParkListData(){
    if(this.rideId){
      console.log("pulling park data rideId: ", this.rideId)
      this.parkService.getParkByRide(this.rideId).subscribe(
        data => {
          this.parks = [];
          this.set(data);
          this.parks.push(data);
          this.parks.forEach(element => {
            //console.log(element);
          });
        }
      )
    }else{
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

  updateSelectedPark(){
    let selectedPark = this.parkSelect.get('parkControl').value;
    console.log("New park selected: ",selectedPark)
    this.parkSelected.emit(selectedPark);
  }
}
