import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RideModel, RideService } from 'src/app/services/ride/ride.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ride-add-form',
  templateUrl: './ride-add-form.component.html',
  styleUrls: ['./ride-add-form.component.css']
})
export class RideAddFormComponent implements OnInit {
  rideAddForm!: FormGroup;
  isError!: boolean;
  registerSuccessMessage!: string;
  rideModel!: RideModel;


  constructor(private rideService: RideService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.rideAddForm = new FormGroup({
      rideName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      firstRode: new FormControl('', Validators.required),
      lastRode: new FormControl('', Validators.required),
      park: new FormControl('', Validators.required)
    });
  }
  addRide(){
    this.rideModel = new RideModel();
    this.rideModel.name = this.rideAddForm.get('rideName').value;
    this.rideModel.description = this.rideAddForm.get('description').value;
    this.rideModel.firstRode = this.rideAddForm.get('firstRode').value;
    this.rideModel.lastRode = this.rideAddForm.get('lastRode').value;
    this.rideModel.park = this.rideAddForm.get('park').value;
    console.log("adding park model: ",this.rideModel);
    this.rideService.addRide(this.rideModel)
      .subscribe(data => {
        this.router.navigate(['/rides']);
      }, error => {
        console.log(error);
        this.toastr.error('Park Failed to add please try again');
      });
  }

}
