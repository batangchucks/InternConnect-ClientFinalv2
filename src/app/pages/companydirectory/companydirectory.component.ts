import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { Router } from '@angular/router';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
@Component({
  selector: 'app-companydirectory',
  templateUrl: './companydirectory.component.html',
  styleUrls: ['./companydirectory.component.scss'],
})
export class CompanydirectoryComponent implements OnInit {
  companySearch!: string;
  companyFound!: boolean;
  searchedCompany: CompanyModel[] = [];
  newelySearched: CompanyModel[] = [];
  photoUrl: string;

  constructor(
    private company: CompanyService,
    private router: Router,
    private File: fileUpload
  ) {}

  ngOnInit(): void {
    this.photoUrl = this.File.photoUrl;

    this.company.getCompany().subscribe((eachC) => {
      console.log(eachC)
      this.searchedCompany = eachC.filter(company=>{
        return company.isActive == true;
      });
    });
  }
}
