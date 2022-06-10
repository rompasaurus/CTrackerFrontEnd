import { Component, OnInit, Input  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyRideModel, MyRideService} from 'src/app/services/myRide/my-ride.service';
import { ParkModel } from 'src/app/services/park/park.service';

@Component({
  selector: 'app-my-ride-list-by-park',
  templateUrl: './my-ride-list-by-park.component.html',
  styleUrls: ['./my-ride-list-by-park.component.css']
})
export class MyRideListByParkComponent implements OnInit {
  @Input() myRides !: MyRideModel[];
  @Input() myParks!: ParkModel[];
  constructor(private myRideService: MyRideService,private toastr: ToastrService, private authService : AuthService) { }

  ngOnInit(): void {
  }
  
  deleteMyRide(rideId:number){
    console.log("Delete Clicked for id: ", rideId);
    let response = this.myRideService.deleteMyRide(rideId).subscribe();
    window.location.reload();
    console.log(response);
  }
  addToRideCount(myRide:MyRideModel,count:number){
    console.log("calling add to ride count with myRide: ", myRide, " Count: ", count);
    myRide.timesRode = myRide.timesRode + count;
    this.myRideService.updateCount(myRide).subscribe(data => {
      this.toastr.success("Updated Ride count for: " + myRide.ride?.name)
    }, error => {
      console.log(error);
      this.toastr.error('Your ride  Failed to update please try again');
    });
  }

}
