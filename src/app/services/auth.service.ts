import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5125/api';

  constructor(private http: HttpClient) { }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<{ emailExists: boolean }>(`${this.apiUrl}/Users/check-email?email=${email}`)
      .pipe(map(response => response.emailExists));
  }
}
