import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(
    private apiService: ApiService
  ) { }

  getDoctors(name?: string | null, category?: string | null): Observable<Doctor[]> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);

    return this.apiService.get<Doctor[]>('Doctors', { params });
  }
}
