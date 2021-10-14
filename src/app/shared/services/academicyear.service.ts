import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AcademicyearService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  getAcademicYear(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/AcademicYear');
  }

  getPdfState(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/pdfState');
  }
}
