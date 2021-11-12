import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-city-dropdown',
  templateUrl: './city-dropdown.component.html',
  styleUrls: ['./city-dropdown.component.css']
})
export class CityDropdownComponent implements OnInit {
  cities!:string[];
  @Input() state!: string;
  @Output() citySelected = new EventEmitter<string>();
  citySelect!:FormGroup;


  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    this.pullCityListData();
    this.citySelect = new FormGroup({
      cityControl : new FormControl('')
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pullCityListData();
  }
  
  pullCityListData(){
    console.log("Pulling City List Data ParkID: ",this.state);
    if(this.state){
      this.parkService.getAllCitiesByState(this.state).subscribe(
        data => {
          this.cities = data;
          this.cities.forEach(element => {
            //console.log(element);
          });
        }
      )
    }else{
      this.parkService.getAllCities().subscribe(
        data => {
          this.cities = data;
          this.cities.forEach(element => {
            //onsole.log(element);
          });
        }
      )
    }
  }
  updateSelectedCity(){
    let selectedCity = this.citySelect.get('cityControl').value;
    console.log("New city selected: ",selectedCity)
    this.citySelected.emit(selectedCity);
  }

}
