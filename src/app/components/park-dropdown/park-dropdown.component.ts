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
  @Input() city!: string;
  @Input() state!: string;
  @Input() country!: string;
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
    }else if(this.city){
      console.log("pulling park data city: ", this.city)
      this.parkService.getParkByCity(this.city).subscribe(
        data => {
          this.parks = data;
        }
      )
    }else if(this.state){
      console.log("pulling park data state: ", this.state)
      this.parkService.getParkByState(this.state).subscribe(
        data => {
          this.parks = data;
        }
      )
    }else if(this.country){
      console.log("pulling park data country: ", this.country)
      this.parkService.getParkByCountry(this.country).subscribe(
        data => {
          this.parks = data;
        }
      )
    }
    // else{
    //   this.parkService.getParkListSortedByName().subscribe(
    //     data => {
    //       this.parks = data;
    //     }
    // )
    // }
  }

  updateSelectedPark(){
    let selectedPark = this.parkSelect.get('parkControl').value;
    console.log("New park selected: ",selectedPark)
    this.parkSelected.emit(selectedPark);
  }
}
