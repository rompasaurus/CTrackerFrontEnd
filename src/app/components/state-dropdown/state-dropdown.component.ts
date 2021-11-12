import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-state-dropdown',
  templateUrl: './state-dropdown.component.html',
  styleUrls: ['./state-dropdown.component.css']
})
export class StateDropdownComponent implements OnInit {
  states!:string[];
  @Input() country!: string;
  @Output() stateSelected = new EventEmitter<string>();
  stateSelect!:FormGroup;


  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullStateListData();
    this.stateSelect = new FormGroup({
      stateControl : new FormControl('')
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pullStateListData();
  }
  
  pullStateListData(){
    console.log("Pulling State List Data ParkID: ",this.country);
    if(this.country){
      this.parkService.getAllStatesByCountry(this.country).subscribe(
        data => {
          this.states = data;
          this.states.forEach(element => {
            //console.log(element);
          });
        }
      )
    }
  }
  updateSelectedState(){
    let selectedState = this.stateSelect.get('stateControl').value;
    console.log("New state selected: ",selectedState)
    this.stateSelected.emit(selectedState);
  }
}
