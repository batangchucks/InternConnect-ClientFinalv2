import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  photoUrl: string;

  companies: CompanyModel[] = [];

  constructor(private company: CompanyService, private File: fileUpload) {}

  ngOnInit(): void {
    this.photoUrl = this.File.photoUrl;

    this.company.getCompany().subscribe((eachC) => {
      this.companies = eachC;
    });
  }
}
