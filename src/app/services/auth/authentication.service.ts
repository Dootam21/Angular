import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  loginUser(username?: string, password?: string){
    const body = {
      'username': username,
      'password': password
    }
    return this.http.post(`${environment.apiUrl}/login-da`, body);
  }
}
