import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CompanyOccurence } from '../models/dashboard.model';
import { studentDashboardModel } from '../models/students.model';

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

  getCompanyWithHighestOccurence(): Observable<CompanyOccurence[]> {
    return this.http.get<CompanyOccurence[]>(
      this.apiUrl + 'api/Submission/dashboard'
    );
  }
}
