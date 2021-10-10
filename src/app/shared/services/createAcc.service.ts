import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { programModel } from '../models/programs.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { userModel } from '../models/user.model';
import { coordinatorModel } from '../models/coordinator.model';
import { studentModel } from '../models/students.model';
import { sectionModel } from '../models/section.model';
import { chairModel } from '../models/chair.model';
import { submissionModel } from '../models/submission.model';
import { adminModel } from '../models/admin.model';
import { environment } from 'src/environments/environment.prod';
import { logsModel } from '../models/logs.model';
import { webState } from '../models/webstate.model';
@Injectable({ providedIn: 'root' })
export class createAccount {
  programs: programModel[] = [];
  coordinator: coordinatorModel[] = [];
  submission: submissionModel[] = [];

  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByAccount(id: number): Observable<adminModel> {
    return this.http.get<adminModel>(this.apiUrl + 'api/Admin/' + id);
  }
  POSTcoordinator(postVal: FormGroup) {
    return this.http.post(this.apiUrl + 'api/Accounts/coordinators', postVal);
  }
  getCoordinator(programId: number): Observable<coordinatorModel[]> {
    // should be in the admin accounts create a new model that should be admin only

    return this.http.get<coordinatorModel[]>(
      this.apiUrl + 'api/Admin/coordinators/' + programId
    );
  }
  deleteCoordinator(id: number) {
    return this.http.delete(this.apiUrl + 'api/Accounts/' + id);
  }
  getChairs(): Observable<chairModel[]> {
    return this.http.get<chairModel[]>(this.apiUrl + 'api/Admin/chairs');
  }
  POSTChair(postVal: NgForm) {
    return this.http.post(this.apiUrl + 'api/Accounts/chair', postVal);
  }

  deleteChair(id: number) {
    return this.http.delete(this.apiUrl + 'api/Accounts/' + id);
  }
  getSection(programId: number): Observable<sectionModel[]> {
    return this.http
      .get<sectionModel[]>(this.apiUrl + 'api/Section')
      .pipe(
        map((eachV) => eachV.filter((eachS) => eachS.programId === programId))
      );
  }
  POSTsection(postVal: FormGroup) {
    return this.http.post(this.apiUrl + 'api/Section', postVal);
  }

  POSTstudent(postVal: FormGroup) {
    console.log(postVal);
    return this.http.post(this.apiUrl + 'api/Accounts/student', postVal);
  }
  deleteStudent(id: number) {
    return this.http.delete(this.apiUrl + 'api/Accounts/' + id);
  }
  resetPassword(postVal: FormGroup) {
    return this.http.post(this.apiUrl + 'api/Auth/resetpassword', postVal, {
      responseType: 'text',
    });
  }

  ForgotPassword(postVal: NgForm) {
    return this.http.post(
      this.apiUrl + 'api/Auth/forgotpassword?email=' + postVal,
      '',
      { responseType: 'text' }
    );
  }

  enrolledStudent(programId: number): Observable<studentModel[]> {
    return this.http
      .get<studentModel[]>(this.apiUrl + 'api/Student')
      .pipe(
        map((eachS) => eachS.filter((eachS) => eachS.program.id === programId))
      );
  }
  enrolledStudentbyCoord(
    programId: number,
    sectionId: number
  ): Observable<studentModel[]> {
    return this.http
      .get<studentModel[]>(this.apiUrl + 'api/Student')
      .pipe(
        map((eachS) =>
          eachS.filter(
            (eachS) =>
              eachS.program.id === programId && eachS.sectionId === sectionId
          )
        )
      );
  }
  POSTtechCoord(postVal: NgForm) {
    return this.http.post(this.apiUrl + 'api/techcoordinator', postVal);
  }

  getSubmissionStudent(studId:number) : Observable<submissionModel[]> {
    return this.http.get<submissionModel[]>(this.apiUrl + 'api/Submission').pipe(
      map((eachS) =>
        eachS.filter((eachS) => eachS.student.id == studId)
      )
    );
  }

  newSubmission(sectionId: number): Observable<submissionModel[]> {
    return this.http
      .get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/1')
      .pipe(
        map((eachS) =>
          eachS.filter((eachS) => eachS.student.sectionId == sectionId)
        )
      );
  }

  POSTsubmission(sectionId: number, programId: number, postVal) {
    // console.log(sectionId);
    // console.log(programId);

    return this.http.post(
      this.apiUrl +
        'api/Submission?sectionId=' +
        sectionId +
        '&programId=' +
        programId,
      postVal
    );
  }

  UPDATEsubmission(postVal) {
    return this.http.put(
      this.apiUrl +
        'api/Submission',postVal
    );
  }

  updateAdminSignature(id: number, postVal) {
    return this.http.put(this.apiUrl + 'api/Admin/signature/' + id, postVal);
  }

  coordinatorApprove(adminId: number,assignIso:number, postVal) {
    return this.http.put(
      this.apiUrl + 'api/AdminResponse/coordinator/' + adminId+'/'+assignIso,
      postVal
    );
  }
  // coordinatorDisapprove(adminId: number, postVal) {
  //   return this.http.put(
  //     this.apiUrl + 'api/AdminResponse/coordinator/' + adminId+assignIso,
  //     postVal
  //   );
  // }
  submissionStep2(programId:number): Observable<submissionModel[]> {
    return this.http
      .get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/2')
      .pipe(
        map((eachS) =>
          eachS.filter((eachS) => eachS.student.section.programId == programId)
        )
      );
  }

  approvedByChair(Payload) {
    return this.http.put(this.apiUrl+'api/AdminResponse/chair',Payload);
  }

  submissionStep3() {
    return this.http.get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/3');
  }
  approvedbyDean(adminId,Payload) {
    return this.http.put(this.apiUrl+'api/AdminResponse/dean/'+adminId,Payload);
  }

  submissionStep4(sectionId:number): Observable<submissionModel[]> {
    return this.http
    .get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/4')
    .pipe(
      map((eachS) =>
        eachS.filter((eachS) => eachS.student.section.id == sectionId)
      )
    );
  }
  approvedPending(submissionId:number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.apiUrl+'api/File/pdf/'+submissionId, { headers: headers, responseType: 'blob' });
  }
  emailSent(payload) {
    return this.http.put(this.apiUrl+'api/AdminResponse/coordinator/email',payload);
  }
  submissionStep5(sectionId:number): Observable<submissionModel[]> {
    return this.http
    .get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/5')
    .pipe(
      map((eachS) =>
        eachS.filter((eachS) => eachS.student.section.id == sectionId)
      )
    );
  }

  approvedCompany(payload) {
    return this.http.put(this.apiUrl+'api/AdminResponse/coordinator/company',payload);

  }

  getLogs(adminId:number): Observable<logsModel[]> {

    return this.http.get< logsModel[]>(this.apiUrl+'api/Logs/adminId?adminId='+adminId);
  }
  getWebstate(): Observable<webState> {
    return this.http.get<webState>(this.apiUrl+'api/Webstate/1');
  }
  updateWebstate(postVal) {
    return this.http.put(this.apiUrl+'api/Webstate',postVal);
    
  }


}
