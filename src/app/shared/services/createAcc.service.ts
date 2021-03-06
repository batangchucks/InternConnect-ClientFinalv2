import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { programModel } from '../models/programs.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { userModel } from '../models/user.model';
import { coordinatorModel } from '../models/coordinator.model';
import { AddStudentModel, ChangeStudentSection, studentModel } from '../models/students.model';
import { sectionModel } from '../models/section.model';
import { chairModel } from '../models/chair.model';
import { compSubmissionModel, submissionModel } from '../models/submission.model';
import { adminModel, AdminUpdateProgram, AdminUpdateSection } from '../models/admin.model';
import { environment } from 'src/environments/environment.prod';
import { logsModel } from '../models/logs.model';
import { webState } from '../models/webstate.model';
import { ReportsModel } from '../models/reports.model';

@Injectable({ providedIn: 'root' })
export class createAccount {
  programs: programModel[] = [];
  coordinator: coordinatorModel[] = [];
  submission: submissionModel[] = [];

  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.post(
      this.apiUrl + 'api/Accounts/techcoordinator',
      postVal
    );
  }
  getAllSubmission(): Observable<ReportsModel[]> {
    return this.http.get<ReportsModel[]>(this.apiUrl + 'api/Submission');
  }

  getSubmissionForCoord(sectionId: number) {
    return this.http.get<ReportsModel[]>(
      this.apiUrl + 'api/Submission/section/' + sectionId
    );
  }

  getSubmissionForChair(programId: number) {
    return this.http.get<ReportsModel[]>(
      this.apiUrl + 'api/Submission/program/' + programId
    );
  }

  getSubmissionStudent(studId: number): Observable<submissionModel> {
    return this.http.get<submissionModel>(
      this.apiUrl + 'api/Submission/' + studId
    );
    // wrong
  }

  submissionSteps(
    stepNumber: number,
    uniqueId: number
  ): Observable<compSubmissionModel[]> {
    return this.http.get<compSubmissionModel[]>(
      this.apiUrl + 'api/Submission/byStep/' + stepNumber + '/' + uniqueId
    );
  }

  POSTsubmission(sectionId: number, programId: number, postVal) {
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
    return this.http.put(this.apiUrl + 'api/Submission', postVal);
  }

  updateAdminSignature(id: number, postVal) {
    return this.http.put(this.apiUrl + 'api/Admin/signature/' + id, postVal);
  }

  coordinatorApprove(adminId: number, assignIso: number, postVal) {

    return this.http.put(
      this.apiUrl +
      'api/AdminResponse/coordinator/' +
      adminId +
      '/' +
      assignIso,
      postVal
    );
  }
  // coordinatorDisapprove(adminId: number, postVal) {
  //   return this.http.put(
  //     this.apiUrl + 'api/AdminResponse/coordinator/' + adminId+assignIso,
  //     postVal
  //   );
  // }

  approvedByChair(Payload) {
    return this.http.put(this.apiUrl + 'api/AdminResponse/chair', Payload);
  }

  approvedbyDean(adminId, Payload) {
    return this.http.put(
      this.apiUrl + 'api/AdminResponse/dean/' + adminId,
      Payload
    );
  }

  approvedPending(submissionId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.apiUrl + 'api/File/pdf/' + submissionId, {
      headers: headers,
      responseType: 'blob',
    });
  }

  previewPdf(adminId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.apiUrl + 'api/file/' + adminId + '/previewPdf', {
      headers: headers,
      responseType: 'blob',
    });
  }

  viewSubmission(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.apiUrl + 'api/File/previewPdf/submission/' + id, {
      headers: headers,
      responseType: 'blob',
    });
  }

  emailSent(payload) {
    return this.http.put(
      this.apiUrl + 'api/AdminResponse/coordinator/email',
      payload
    );
  }
  submissionStep5(sectionId: number): Observable<submissionModel[]> {
    return this.http
      .get<submissionModel[]>(this.apiUrl + 'api/Submission/byStep/5')
      .pipe(
        map((eachS) =>
          eachS.filter((eachS) => eachS.student.section.id == sectionId)
        )
      );
  }

  approvedCompany(payload) {
    return this.http.put(
      this.apiUrl + 'api/AdminResponse/coordinator/company',
      payload
    );
  }

  getLogsByAdminId(id: number): Observable<logsModel[]> {
    return this.http.get<logsModel[]>(this.apiUrl + 'api/Logs/admin/'+id);
  }

  getLogsBySubmission(submissionId: number): Observable<logsModel[]> {
    return this.http.get<logsModel[]>(
      this.apiUrl + 'api/Logs/submission/' + submissionId
    );
  }

  getAllLogs(): Observable<logsModel[]> {
    return this.http.get<logsModel[]>(this.apiUrl + 'api/Logs');
  }

  getWebstate(): Observable<webState> {
    return this.http.get<webState>(this.apiUrl + 'api/Webstate/1');
  }
  updateWebstate(postVal) {
    return this.http.put(this.apiUrl + 'api/Webstate', postVal);
  }

  getFileUpload(payload: any) {
    let headers = new HttpHeaders();


    return this.http.post(this.apiUrl + 'api/File/excel', payload, {
      responseType: 'blob',
    });
  }
  changeDean(payload: any) {
    return this.http.post(this.apiUrl + 'api/Accounts/changeDean', payload, {
      responseType: 'text',
    });
  }
  onBoardNewDean(payload: any, oldemail: string) {
    return this.http.post(
      this.apiUrl + '/api/Auth/changedean?oldEmail=' + oldemail,
      payload,
      { responseType: 'text' }
    );
  }

  getAllTechCoordinator(): Observable<coordinatorModel[]> {
    return this.http.get<coordinatorModel[]>(
      this.apiUrl + 'api/Admin/techcoord'
    );
  }

  SwitchChairProgram(payload: AdminUpdateProgram[]): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/Admin/program', payload);
  }

  SwitchChairSection(payload: AdminUpdateSection[]) {
    return this.http.put<any>(this.apiUrl + 'api/Admin/section', payload);
  }

  ChangeStudentSection(payload: ChangeStudentSection): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/Student', payload);
  }

  batchUpload(payload: AddStudentModel[]): Observable<AddStudentModel[]> {
    return this.http.post<AddStudentModel[]>(
      this.apiUrl + 'api/Accounts/students',
      payload
    );
  }

  DeleteSignature(adminId: number, adminEmail: string): Observable<any> {
    return this.http.delete<any>(
      this.apiUrl +
        'api/Admin/esignature/' +
        adminId +
        '?adminEmail=' +
        adminEmail
    );
  }
}
