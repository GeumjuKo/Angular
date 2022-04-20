import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service'

const endpoint = 'https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com'

@Injectable({
  providedIn: 'root'
})
export class HttpCallerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private syncHttpHeader(): any{
    let currentSession = this.authService.currentUserSession()

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': currentSession.accessToken.jwtToken
      })
    }
  }

  public get(url?: String): Observable<any> {
    return this.http.get(endpoint + url, this.syncHttpHeader())
  }
}
