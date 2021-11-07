import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl = BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getParkList(): Observable<ParkModel[]> {
    console.log("getting park list");
    let parks = this.httpClient.get<Array<ParkModel>>(this.baseUrl + '/api/park');
    return parks;
  }
  getParkListSortedByName(): Observable<ParkModel[]> {
    return this.httpClient.get<Array<ParkModel>>(this.baseUrl + '/api/park').pipe(
      map(results => results.sort((x,y) => x.parkName?.toUpperCase() < y.parkName?.toUpperCase() ? -1 : 1)));
  }
  addPark(park:ParkModel){
    console.log("Adding Park: ",park.parkName, "Location: ", park.location);
    let parkPost = this.httpClient.post(this.baseUrl + '/api/park/', park);
     return parkPost
  }
}

export class ParkModel {
  id?: number;
  parkName?: string;
  location?: string;
  openDate?: Date;
}
