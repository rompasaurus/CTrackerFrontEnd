import { Injectable } from '@angular/core';
import { Park } from '../common/park';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl = 'http://localhost:8080/api/parks';

  constructor(private httpClient: HttpClient) { }

  getParkList(): Observable<Park[]> {
    console.log("getting park list");
    var response = this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.parks)
    );
    console.log("response: ", response);
    return response;
  }
}

interface GetResponse {
  _embedded: {
    parks: Park[];
  }
}
