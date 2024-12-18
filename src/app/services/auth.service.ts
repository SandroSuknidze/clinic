import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5125/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  firstname: string | null = null;
  lastname: string | null = null;
  role: string | null = null;


  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<{ emailExists: boolean }>(`${this.apiUrl}/Users/check-email?email=${email}`)
      .pipe(map(response => response.emailExists));
  }

  checkPersonalIdExists(personalId: number): Observable<boolean> {
    return this.http.get<{ personalIdExists: boolean }>(`${this.apiUrl}/Users/check-personal-id?personalId=${personalId}`)
      .pipe(map(response => response.personalIdExists));
  }

  sendEmailConfirmation(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Users/send-verification-code`, { email });
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/Users/validateToken`, null, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(response => response.valid),
    );
  }



  private saveToken(token: string): void {
    this.cookieService.set('token', token, { path: '/', secure: true, sameSite: 'Strict' });
    this.isAuthenticatedSubject.next(true);
    this.decodeToken();
  }

  decodeToken(): void {
    const token = this.cookieService.get('token');
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      console.log(decoded);

      this.firstname = decoded.FirstName || null;
      this.lastname = decoded.LastName || null;
      this.role = decoded.Role || null;

    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.cookieService.get('token');
  }

  getUserRole(): string | null {
    const token = this.cookieService.get('token');
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.Role;
    }
    return null;
  }

  handleRegistrationResponse(response: any): void {
    const token = response.accessToken;
    if (token) {
      this.saveToken(token);
    }
  }

  logout() {
    this.router.navigate(['/']);
    this.cookieService.delete('token', '/');
    this.firstname = null;
    this.lastname = null;
    this.role = null;
    this.isAuthenticatedSubject.next(false);
    this.toastr.success('თქვენ წარმატებით გამოხვედით სისტემიდან!', 'წარმატება!');
  }


  initializeAuthState() {
    const token = this.cookieService.get('token');
    if (token) {
      this.validateToken(token).subscribe({
        next: (valid) => {
          if (!valid) {
            console.error('Invalid token detected');
            this.logout();
          }
          this.decodeToken();
        },
        error: (err) => {
          console.error('Error validating token:', err);
          this.logout();
        }
      });
    }
  }




}
