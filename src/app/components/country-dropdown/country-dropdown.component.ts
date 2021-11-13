import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.css']
})
export class CountryDropdownComponent implements OnInit {
    countries!:string[];
    @Output() countrySelected = new EventEmitter<string>();
    countrySelect!:FormGroup;
  
  constructor(private parkService : ParkService) { }

  ngOnInit(): void {
    this.pullCountryListData();
    this.countrySelect = new FormGroup({
      countryControl : new FormControl('')
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pullCountryListData();
  }
  
  pullCountryListData(){
    console.log("Pulling Country List Data");
      this.parkService.getAllCountries().subscribe(
        data => {
          this.countries = data;
          this.countries.forEach(element => {
            console.log(element);
          });
        })
  }
  updateSelectedCountry(){
    let selectedCountry = this.countrySelect.get('countryControl').value;
    console.log("New country selected: ",selectedCountry)
    this.countrySelected.emit(selectedCountry);
  }

}
