import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RideService {
  private baseUrl = 'http://localhost:8080/api/rides';

  constructor(private httpClient: HttpClient) { }

  getAllRides(): Observable<Array<RideModel>> {
    return this.httpClient.get<Array<RideModel>>('http://localhost:8080/api/ride');
  }
}

export class RideModel {
  id?: number;
  name?: string;
  description?: string;
  firstRode?: Date;
  lastRode?: Date;
  park?: string;
}