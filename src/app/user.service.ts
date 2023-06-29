import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from './user.entity';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  getUsers(count?: number): Observable<User[]> {
    if (!count) count = 3;

    console.log(`${environment.apiUrl}?results=${count}`);
    return this.http.get<any>(`${environment.apiUrl}/?results=${count}`).pipe(
      map((response) => {
        
        return response.results;
      })
    );
  }
}
