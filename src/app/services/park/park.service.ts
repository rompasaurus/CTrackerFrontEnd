import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.constants';

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
