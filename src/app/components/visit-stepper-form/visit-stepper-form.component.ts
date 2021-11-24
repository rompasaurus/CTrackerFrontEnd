import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.countrySelection = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.parkSelection = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.stateSelection = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}