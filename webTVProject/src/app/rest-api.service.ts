import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


const url = 'http://localhost:5050';

const httpOptions ={
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface Video {
  _id: string;
}

@Injectable({
  providedIn: 'root'
})

export class RestAPIService {
  constructor(private http: HttpClient) { }
    
  /* for Nontype response */
  private extractData(res: Response) {
    let body = res;
   return body || { };
}
  
getVideo(): Observable<any> {
    console.log('request ip:' + url+'/Video')
    return this.http.get<Video>(url + '/Video').pipe(catchError(this.handleError));
}

// updateVideo(id: string): Observable<any> {
//   return this.http.put<Video>(url + '/Video' + id).pipe(catchError(this.handleError)
//   );
// }

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}

}
