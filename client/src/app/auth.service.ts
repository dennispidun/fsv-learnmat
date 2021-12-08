import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public async validate(token: String): Promise<Boolean> {
    return this.http.post(environment.apiUrl + '/validate', {
        token
      }, {
        observe: 'response'
      }).toPromise().then(response => {
        console.log(response.status)
        return response.status == 200;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }
}
