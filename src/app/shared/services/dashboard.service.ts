import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { studentDashboardModel, studentModel } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getStudentList(): Observable<studentDashboardModel[]> {
    return this.http.get<studentDashboardModel[]>(
      this.apiUrl + 'api/Student/dashboard'
    );
  }
}
