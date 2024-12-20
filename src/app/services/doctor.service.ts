import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(
    private apiService: ApiService
  ) { }

  fetchDoctors(): Observable<Doctor[]> {
    return this.apiService.get<Doctor[]>('Doctors');
  }
}
