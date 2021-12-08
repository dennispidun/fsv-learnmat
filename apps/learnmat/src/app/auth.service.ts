import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async signup(email: string): Promise<void> {
    return this.http.post(environment.apiUrl + '/signup', {
      email
    }, {
      observe: 'response'
    }).toPromise().then(response => {
      
    }).catch(error => {
      throw error;
    });
  }

  public validate(token: String): Observable<HttpResponse<Object>> {
    return this.http.post(environment.apiUrl + '/validate', {
      token
    }, {
      observe: 'response'
    });
  }
}
