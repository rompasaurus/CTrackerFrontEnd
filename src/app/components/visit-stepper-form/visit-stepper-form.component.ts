import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';


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
  country: string;
  parkID: number;
  parks: ParkModel[];
  park: ParkModel;
  ride: RideModel;
  rides: RideModel[];


  constructor(private _formBuilder: FormBuilder, private parkService: ParkService, private rideService: RideService) { }

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

  pullCountryListData() {
    console.log("Pulling Country List Data");
    this.parkService.getAllCountries().subscribe(
      data => {
        this.countries = data;
      })
  }
  pullStates() {
    console.log(this.countrySelection)
    this.country = this.countrySelection.get("countrySelection")?.value;  //get("countrySelection").value;
    console.log("pulling states using country: ", this.country);
    if (this.country) {
      this.parkService.getAllStatesByCountry(this.country).subscribe(
        data => {
          this.states = data;
        }
      )
    }
  }
  pullParkListData() {
    console.log("pullind ride list using park: ",this.countrySelection)
    this.country = this.countrySelection.get("countrySelection")?.value;
    this.state = this.stateSelection.get("stateSelection")?.value;
    console.log("pulling State selection: ", this.state);
    if (this.state) {
      console.log("pulling park data state: ", this.state)
      this.parkService.getParkByState(this.state).subscribe(
        data => {
          this.parks = data;
        }
      )
    } else if (this.country) {
      console.log("pulling park data country: ", this.country)
      this.parkService.getParkByCountry(this.country).subscribe(
        data => {
          this.parks = data;
        }
      )
    }
  }
  pullRideListData() {
    this.parkID = this.parkSelection.get("parkSelection")?.value;
    console.log("pullind ride list using park: ",this.parkID)
    console.log("pullind ride list using park: ",this.parkSelection)
    console.log("pullind ride list using park: ",this.stateSelection)
    console.log("pullind ride list using park: ",this.rideSelection)
    if (this.parkID) {
      this.rideService.getAllRidesByPark(this.parkID).subscribe(
        data => {
          this.rides = data;
        }
      )
    }
  }
}