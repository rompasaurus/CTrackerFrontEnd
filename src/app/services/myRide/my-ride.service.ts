import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/app/app.constants';
import { ParkModel } from '../park/park.service';
import { RideModel } from '../ride/ride.service';

@Injectable({
  providedIn: 'root'
})
export class MyRideService {
  private baseUrl = BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getAllRides(userName:string): Observable<Array<MyRideModel>> {
    return this.httpClient.get<Array<MyRideModel>>(this.baseUrl + '/api/myrides/by-user/'+userName);
  }
  getAllRidesSortedByRideName(userName:string): Observable<MyRideModel[]> {
    return this.httpClient.get<Array<MyRideModel>>(this.baseUrl + '/api/myrides/by-user/'+userName).pipe(
      map(results => results.sort((x,y) => x.ride?.name?.toUpperCase() < y.ride?.name?.toUpperCase() ? -1 : 1)));
  }
  getAllRidesSortedByParkName(userName:string): Observable<MyRideModel[]> {
    return this.httpClient.get<Array<MyRideModel>>(this.baseUrl + '/api/myrides/by-user/'+userName).pipe(
      map(results => results.sort((x,y) => x.park.parkName?.toUpperCase() < y.park.parkName?.toUpperCase() ? -1 : 1)));
  }
  addRide(myRide:MyRideModel){
    console.log("Adding Ride for user: ",myRide.userName, " parkId: ", myRide.parkId, " First Rode: ",myRide.firstRode," Last Rode: ",myRide.lastRode, " Park: ", myRide.parkId);
    let ridePost = this.httpClient.post(this.baseUrl + '/api/myrides/by-user/'+myRide.userName, myRide);
     return ridePost;
  }
  deleteMyRide(rideId: number) {
    console.log("Deleting Ride with id of: ",rideId);
    let rideDelete = this.httpClient.delete(this.baseUrl + '/api/myrides/delete/'+rideId);
    return rideDelete;
  }
  updateCount(myride: MyRideModel) {
    let rideUpdate = this.httpClient.post(this.baseUrl + '/api/myrides/update/', myride);
    return rideUpdate;
  }
}
export class MyRideModel {
  id?: number;
  userId?:number;
  userName?:string;
  rideId?:number;
  parkId?:number;
  timesRode?: number;
  rankInPark?: number;
  rankOverall?:number;
  rating?:number;
  review?:string;
  bestSeat?:string;
  firstRode?:Date;
  lastRode?:Date;
  park?:ParkModel;
  ride?:RideModel;
}