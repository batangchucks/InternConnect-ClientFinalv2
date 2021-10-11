import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { isoCodeListModel } from '../models/isoCodeList.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class IsoCodeService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getReturnIso(adminId:number):Observable<isoCodeListModel[]> {
    return this.http.get<isoCodeListModel[]>(this.apiUrl + 'api/IsoCode/admin/' + adminId);
  }
  getCoordinatorData(programId: number) {
    return this.http.get(this.apiUrl + 'api/Admin/coordinators/' + programId);
  }

  postIsoCode(payload:any[], adminId: number) {
    return this.http.post(this.apiUrl + "api/IsoCode/addisocode/" + adminId, payload)
  }

  getIsoCode(programId: number):Observable<isoCodeListModel[]> {

    return this.http.get<isoCodeListModel[]>(this.apiUrl + "api/IsoCode/program/" + programId)
  }
  transferIso(payload:any,adminId:number) {
    return this.http.put(this.apiUrl + "api/IsoCode/transfertocoordinator/" + adminId,payload)
  }

  deleteIsoCode(id:number) {
    return this.http.delete(this.apiUrl + "api/IsoCode/" + id);
  }
  getIsoById(adminId:number): Observable<isoCodeListModel[]> {

    return this.http
      .get<isoCodeListModel[]>(this.apiUrl + 'api/IsoCode/admin/'+adminId)
      .pipe(map((eachIso) => eachIso.filter((eachIso) => eachIso.used === false)));
  }

  getISObyCoord(adminId:number):Observable<isoCodeListModel[]> {

    return this.http.get<isoCodeListModel[]>(this.apiUrl+'api/IsoCode/admin/'+adminId);
  }

  returnToChair(programId:number,payload:any[]) {
    return this.http.put(this.apiUrl+'api/IsoCode/transfertochair/'+programId,payload);
  }
}
