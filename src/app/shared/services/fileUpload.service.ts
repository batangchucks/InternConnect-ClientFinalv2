import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })

export class fileUpload {
  readonly apiUrl = environment.apiUrl;

  readonly photoUrl = environment.apiUrl + 'images/Company/';
  readonly photoUrlL = environment.apiUrl+'images/logo/';
  readonly photoUrlSig = environment.apiUrl+'images/signatures/';
  constructor(private http: HttpClient) {}

  uploadEndorsement(formData: FormData) {
    return this.http.post(this.apiUrl + 'api/File/image/company', formData, {
      responseType: 'text',
    });
  }
  uploadEsign(formData: FormData) {
    return this.http.post(this.apiUrl + 'api/File/image/signatures', formData, {
      responseType: 'text',
    });
  }

  uploadLanding(formData: FormData) {
    return this.http.post(this.apiUrl + 'api/File/image/logo', formData, {
      responseType: 'text',
    });
  }
 

  
}
