import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.constants';
import { ParkModel } from '../park/park.service';


@Injectable({
  providedIn: 'root'
})
export class RideService {
  private baseUrl = BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getAllRides(): Observable<Array<RideModel>> {
    return this.httpClient.get<Array<RideModel>>(this.baseUrl + '/api/ride');
  }
  addRide(ride:RideModel){
    console.log("Adding Ride: ",ride.name, " description: ", ride.description, " First Rode: ",ride.firstRode," Last Rode: ",ride.lastRode, " Park: ", ride.parkId);
    let ridePost = this.httpClient.post(this.baseUrl + '/api/ride/', ride);
     return ridePost;
  }
}

export class RideModel {
  id?: number;
  name?: string;
  description?: string;
  firstRode?: Date;
  lastRode?: Date;
  parkId?: number;
  park!: ParkModel;
}