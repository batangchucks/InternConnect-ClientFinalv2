import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { opportunityModel } from 'src/app/shared/models/opportunity.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { NgForm } from '@angular/forms';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
})
export class OpportunitiesComponent implements OnInit {
  photoUrl: string;

  Companies: CompanyModel[] = [];

  opportunity: opportunityModel[] = [];

  constructor(private company: CompanyService, private File: fileUpload) {}

  ngOnInit(): void {
    this.photoUrl = this.File.photoUrl;

    this.company.getOpportunity().subscribe((eO) => {
      this.opportunity = eO;
    },(err:Error)=> {
      this.ngOnInit();
    });
  }
}
