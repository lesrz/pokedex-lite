import { UserLogin } from './shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
