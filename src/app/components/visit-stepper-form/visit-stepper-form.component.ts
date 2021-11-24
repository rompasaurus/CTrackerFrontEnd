import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';


@Component({
  selector: 'app-visit-stepper-form',
  templateUrl: './visit-stepper-form.component.html',
  styleUrls: ['./visit-stepper-form.component.css']
})
export class VisitStepperFormComponent implements OnInit {
  isLinear = false;
  countrySelection: FormGroup;
  parkSelection: FormGroup;
  stateSelection: FormGroup;
  dateSelection: FormGroup;
  rideSelection: FormGroup;
  startDate = new Date(2021, 0, 1);
  countries !: string[];
  states !: string[];
  state: string;
  country : string;
  park : ParkModel;
  parks : ParkModel[];
  

  constructor(private _formBuilder: FormBuilder, private parkService: ParkService) {}

  ngOnInit() {
    this.pullCountryListData();
    this.countrySelection = this._formBuilder.group({
      countrySelection: ['', Validators.required],
    });
    this.parkSelection = this._formBuilder.group({
      parkSelection: ['', Validators.required],
    });
    this.stateSelection = this._formBuilder.group({
      stateSelection: ['', Validators.required],
    });
    this.dateSelection = this._formBuilder.group({
      date: ['', Validators.required],
    });
    this.rideSelection = this._formBuilder.group({
      rideSelection: ['', Validators.required],
    });
  }

  pullCountryListData(){
    console.log("Pulling Country List Data");
      this.parkService.getAllCountries().subscribe(
        data => {
          this.countries = data;
        })
  }
  pullStates(){  
    console.log( this.countrySelection )
    this.country = this.countrySelection.get("countrySelection")?.value;  //get("countrySelection").value;
    console.log("pulling states using country: ", this.country);
    if(this.country){
      this.parkService.getAllStatesByCountry(this.country).subscribe(
        data => {
          this.states = data;
        }
      )
    }
  }
  pullParkListData(){
  this.country = this.countrySelection.get("countrySelection")?.value;
  this.state = this.countrySelection.get("stateSelection")?.value;
   if(this.state){
      console.log("pulling park data state: ", this.state)
      this.parkService.getParkByState(this.state).subscribe(
        data => {
          this.parks = data;
        }
      )
    }else if(this.country){
      console.log("pulling park data country: ", this.state)
      this.parkService.getParkByCountry(this.country).subscribe(
        data => {
          this.parks = data;
        }
      )
    }
  }
}