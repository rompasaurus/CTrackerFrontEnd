import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkModel, ParkService } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-park-add-form',
  templateUrl: './park-add-form.component.html',
  styleUrls: ['./park-add-form.component.css']
})
export class ParkAddFormComponent implements OnInit {
  parkAddForm!: FormGroup;
  isError!: boolean;
  parkmodel!: ParkModel;


  constructor(private parkService: ParkService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.parkAddForm = new FormGroup({
      parkName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }
  addPark(){
    this.parkmodel = new ParkModel();
    this.parkmodel.location = this.parkAddForm.get('location').value;
    this.parkmodel.parkName = this.parkAddForm.get('parkName').value;
    console.log("adding park model: ",this.parkmodel);
    this.parkService.addPark(this.parkmodel)
      .subscribe(data => {
        this.router.navigate(['/parks']);
      }, error => {
        console.log(error);
        this.toastr.error('Park Failed to add please try again');
      });
  }
}
