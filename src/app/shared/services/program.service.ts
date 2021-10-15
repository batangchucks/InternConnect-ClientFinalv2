import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { programModel } from '../models/programs.model';
import { HttpClient } from '@angular/common/http';
import { sectionModel } from '../models/section.model';
import { FormGroup, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { tracksModel } from '../models/tracks.model';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  programs: programModel[] = [];
  section: sectionModel[] = [];

  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProgram(): Observable<programModel[]> {
    return this.http.get<programModel[]>(this.apiUrl + 'api/Program');
  }

  deleteProgram(id: number) {
    return this.http.delete(this.apiUrl + 'api/Program/' + id);
  }

  putProgram(formVal: FormGroup) {
    return this.http.put(this.apiUrl + 'api/Program/program', formVal);
  }
  getAllsection() {
    return this.http.get<sectionModel[]>(this.apiUrl+'api/Section');
  }
  getSection(id: number): Observable<sectionModel[]> {
    // return this.http.get<sectionModel[]>(this.apiUrl+"Sections").pipe(
    //     map(o => o.map((sp): sectionModel => (sp.programId)))
    // );
    return this.http
      .get<sectionModel[]>(this.apiUrl + 'api/Section')
      .pipe(map((eachS) => eachS.filter((sec) => sec.programId === id)));
  }
  PUTsection(postVal: FormGroup) {
    return this.http.put(this.apiUrl + 'api/Section', postVal);
  }
  deleteSection(id: number) {
    return this.http.delete(this.apiUrl + 'api/Section/' + id);
  }

  updateISO(formVal: FormGroup) {
    return this.http.put(this.apiUrl + 'api/Program/ISO', formVal);
  }
  getSingleProgram(id: number): Observable<programModel[]> {
    return this.http
      .get<programModel[]>(this.apiUrl + 'api/Program')
      .pipe(map((eachP) => eachP.filter((eachP) => eachP.id === id)));
  }
  POSTProgram(formVal: NgForm) {
    return this.http.post(this.apiUrl + 'api/Program', formVal);
  }
  POSTtracks(postVal: NgForm) {
    return this.http.post(this.apiUrl + 'api/Track', postVal);
  }

  getSingleTrack(id: number): Observable<tracksModel[]> {
    return this.http
      .get<tracksModel[]>(this.apiUrl + 'api/Track')
      .pipe(map((eachT) => eachT.filter((eachT) => eachT.id == id)));
  }
  updateTrack(postVal) {
    return this.http.put(this.apiUrl + 'api/Track', postVal);
  }
  deleteTrack(id: number) {
    return this.http.delete(this.apiUrl + 'api/Track/' + id);
  }
}
