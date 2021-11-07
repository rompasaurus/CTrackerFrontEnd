import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';
import { ToastrService } from 'ngx-toastr';
import { ParkModel } from 'src/app/services/park/park.service';


@Component({
  selector: 'app-ride-add-form',
  templateUrl: './ride-add-form.component.html',
  styleUrls: ['./ride-add-form.component.css']
})
export class RideAddFormComponent implements OnInit {
  rideAddForm!: FormGroup;
  isError!: boolean;
  rideModel!: RideModel;
  parkSelect!:ParkModel;


  constructor(private rideService: RideService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.rideAddForm = new FormGroup({
      rideName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      firstRode: new FormControl('', Validators.required),
      lastRode: new FormControl('', Validators.required),
      parkId: new FormControl('', Validators.required)
    });
  }
  onParkSelected(park:ParkModel){
    this.parkSelect = park;
    this.rideAddForm.get('parkId')?.setValue(this.parkSelect.id);
  }
  addRide(){
    console.log("park selected: ",this.parkSelect);
    console.log("rideAddForm: ",this.rideAddForm);
    this.rideAddForm.markAllAsTouched(); 
    if(this.rideAddForm.status == "VALID"){
      this.rideModel = new RideModel();
      this.rideModel.name = this.rideAddForm.get('rideName').value;
      this.rideModel.description = this.rideAddForm.get('description').value;
      this.rideModel.firstRode = this.rideAddForm.get('firstRode').value;
      this.rideModel.lastRode = this.rideAddForm.get('lastRode').value;
      this.rideModel.parkId = this.parkSelect.id;
      console.log("adding ride model: ",this.rideModel);
      this.rideService.addRide(this.rideModel)
        .subscribe(data => {
          this.router.navigate(['/rides']);
        }, error => {
          console.log(error);
          this.toastr.error('Park Failed to add please try again');
        });
    }else{

    }
  }

}
