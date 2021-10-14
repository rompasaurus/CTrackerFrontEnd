import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ride } from '../common/ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private baseUrl = 'http://localhost:8080/api/rides';

  constructor(private httpClient: HttpClient) { }

  getRideList(): Observable<Ride[]> {
    console.log("getting park list");
    var response = this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.rides)
    );
    console.log("response: ", response);
    return response;
  }
}

interface GetResponse {
  _embedded: {
    rides: Ride[];
  }
}