import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { studentModel } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getStudentList(): Observable<studentModel[]> {
    return this.http.get<studentModel[]>(this.apiUrl + 'api/Student');
  }
}
