import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { environment } from 'src/environments/environment.prod';
import { opportunityModel } from '../models/opportunity.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  Company: CompanyModel[] = [];
  Opportunity: opportunityModel[] = [];

  singleCompany = new Subject<CompanyModel>();
  companyPerO = new Subject<CompanyModel>();
  // services
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  readonly apiUrl = environment.apiUrl;

  getCompany(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.apiUrl + 'api/Company');
  }
  getOpportunity(): Observable<opportunityModel[]> {
    return this.http.get<opportunityModel[]>(this.apiUrl + 'api/Opportunity');
  }

  getCompanyById(index: number): Observable<CompanyModel> {
    const path = this.apiUrl + 'api/Company/' + index;
    return this.http.get<CompanyModel>(path);
  }
  getOpportunityByCompany(index: number): Observable<opportunityModel[]> {
    const path = this.apiUrl + 'api/Opportunity/company/' + index;
    return this.http.get<opportunityModel[]>(path);
  }
  setShowCaseOpportunity() {
    this.http
      .get<opportunityModel[]>(this.apiUrl + 'api/Opportunity')
      .subscribe((eachO) => {
        this.showCaseOpportunity(eachO);
        // console.log(this.Opportunity);
      });
  }
  showCaseOpportunity(eachO: opportunityModel[]) {
    this.Opportunity = eachO;
    for (let i = 0; i < this.Opportunity.length; i++) {
      let path = this.apiUrl + 'api/Company/' + this.Opportunity[i].companyId;
      this.http.get<CompanyModel>(path).subscribe((eachC) => {
        this.companyPerO.next(eachC);
      });
    }
  }
  deleteByOpportunity(index: number): Observable<opportunityModel[]> {
    const path = this.apiUrl + 'api/Opportunity/' + index;
    return this.http.delete<opportunityModel[]>(path);
  }
  deleteCompany(eachId: number): Observable<CompanyModel[]> {
    const path = this.apiUrl + 'api/Company/' + eachId;
    return this.http.delete<CompanyModel[]>(path);
  }
  updateCompany(upCompany: FormGroup): Observable<CompanyModel[]> {
    return this.http.put<CompanyModel[]>(
      this.apiUrl + 'api/Company',
      upCompany
    );
  }
  createCompany(crCompany: NgForm): Observable<CompanyModel[]> {
    return this.http.post<CompanyModel[]>(
      this.apiUrl + 'api/Company',
      crCompany
    );
  }

  createOpportunity(crOpportunity: NgForm): Observable<opportunityModel[]> {
    return this.http.post<opportunityModel[]>(
      this.apiUrl + 'api/Opportunity',
      crOpportunity
    );
  }
  updateOpportunity(opU: FormGroup): Observable<opportunityModel[]> {
    return this.http.put<opportunityModel[]>(
      this.apiUrl + 'api/Opportunity',
      opU
    );
  }
}
