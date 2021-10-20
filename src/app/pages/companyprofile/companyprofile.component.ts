import { Component, Injectable, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { CompanyStatusList } from 'src/app/shared/models/enums.model';
import { opportunityModel } from 'src/app/shared/models/opportunity.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss'],
})
export class CompanyprofileComponent implements OnInit {
  index!: number;
  public Companies: CompanyModel[] = [];
  opportunity: opportunityModel[] = [];
  companyProfile!: CompanyModel;

  photoUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private company: CompanyService,
    private File: fileUpload
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.photoUrl = this.File.photoUrl;

    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
    });
    this.company.getCompanyById(this.index).subscribe((eachC) => {
      this.companyProfile = eachC;
      if(this.companyProfile.status == CompanyStatusList.EXPIRED.toString()) {
        this.router.navigate(["/"]);
      }
    });

    this.company.getOpportunityByCompany(this.index).subscribe((eachValue) => {
      this.opportunity = eachValue;
    });

  }
}
