import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl = 'http://localhost:8080/api/parks';

  constructor(private httpClient: HttpClient) { }

  getParkList(): Observable<ParkModel[]> {
    console.log("getting park list");
    let parks = this.httpClient.get<Array<ParkModel>>('http://localhost:8080/api/park');
    return parks;
  }
}

export class ParkModel {
  id?: number;
  parkName?: string;
  location?: string;
  openDate?: Date;
}
