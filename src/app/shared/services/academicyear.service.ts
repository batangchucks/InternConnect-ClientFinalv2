import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ReadAcademicYearModel } from '../models/AcademicYear.model';
import { fileUpload } from './fileUpload.service';

@Injectable({
  providedIn: 'root',
})
export class AcademicyearService {
  constructor(private http: HttpClient, private fileUpload: fileUpload) {}
  private apiUrl = environment.apiUrl;
  getAcademicYear(): Observable<ReadAcademicYearModel> {
    return this.http.get<ReadAcademicYearModel>(this.apiUrl + 'api/AcademicYear');
  }

  getPdfState(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/pdfState');
  }

  resetYear(startYear: number, endYear: number, payload: any): Observable<any> {
    // let header = new HttpHeaders({
    //   'content-type': 'application/json-patch+json',
    // });
    return this.http.post<any>(
      this.apiUrl +
        'api/Accounts/DeleteAll?startYear=' +
        startYear +
        '&endYear=' +
        endYear,
      payload
    );
  }

  updateAcademicYear(ayPayload: any): Observable<any> {
    return this.http.put(this.apiUrl + 'api/AcademicYear', ayPayload);
  }

  updatePdfState(psPayload: any): Observable<any> {
    return this.http.put(this.apiUrl + 'api/PdfState', psPayload);
  }
}
