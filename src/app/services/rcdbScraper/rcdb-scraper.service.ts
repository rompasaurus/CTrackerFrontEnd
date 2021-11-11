import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/app.constants';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RcdbScraperService {

  dataDump!: string;
  constructor(private http: HttpClient) { }


  scrapePageData(pageNumber:number):number{
    var datahold
    let response = this.http.get("http://localhost:3000/https://rcdb.com/"+pageNumber+".htm",{responseType: 'text'}).
      subscribe(data => 
        {
          this.dataDump = data;
          this.savePageData(pageNumber,this.dataDump);
          this.scrapePageData(pageNumber+1);
        }, error => {
          throwError(error);
          this.scrapePageData(pageNumber+1);
        }); 
    return this.dataDump.length;
  }

  savePageData(id:number, data:string){
    console.log("adding page: ",id," data: ", data)
    let response = this.http.post(BASE_URL+'/api/rcdb/page/'+id,data).subscribe();
    console.log(response);
  }

  extractTitleData() {
    console.log("Sent extraction request")
    let response = this.http.get(BASE_URL+'/api/rcdb/extractTitles').subscribe();
    console.log(response);
  }


}
