import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { opportunityModel } from 'src/app/shared/models/opportunity.model';
import { CompanyModel } from 'src/app/shared/models/company.model';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyStatusList } from 'src/app/shared/models/enums.model';

@Component({
  selector: 'app-opportunities-update',
  templateUrl: './opportunities-update.component.html',
  styleUrls: ['./opportunities-update.component.scss'],
})
export class OpportunitiesUpdateComponent implements OnInit {
  p: number = 1;
  Opportunities: opportunityModel[] = [];
  CreateIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  updateOpportunity!: FormGroup;
  Company: CompanyModel[] = [];
  opportunityId:number;

  constructor(
    private company: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.company.getOpportunity().subscribe((eO) => {
      this.Opportunities = eO.filter((opp)=>{
        return opp.company.isActive == true && opp.company.status != CompanyStatusList[2]
      });
    },(err:Error)=>{
      alert("An error has occured");
      this.ngOnInit();
    });
    this.company.getCompany().subscribe((eC) => {
      this.Company = eC.filter(comp => {
        return comp.status != CompanyStatusList[2]
      });

    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });

    // this.company.POST_Opportunity();
  }
  deleteOpportunity(index: number) {
    this.opportunityId = index;
    this.DeleteIndicator = true;


  }
  createOpportunitySubmit(f: NgForm) {
    this.company.createOpportunity(f.value).subscribe((crO) => {
      this.toCancelOne();
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }
  toCreate() {
    this.CreateIndicator = true;
  }

  toCancel() {
    this.DeleteIndicator = false;
  }

  toCancelOne() {
    this.CreateIndicator = false;
  }

  confirmDelete() {
    this.company.deleteByOpportunity(this.opportunityId).subscribe(opDel=> {
      this.DeleteIndicator = false;
      this.opportunityId = null;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    })
  }

  toUpdate(eO: opportunityModel) {
    this.UpdateIndicator = true;

    const title = eO.title;

    const position = eO.position;
    const introduction = eO.introduction;
    const id = eO.id;
    const companyId = eO.companyId;

    this.updateOpportunity = new FormGroup({
      title: new FormControl(title),
      position: new FormControl(position),
      introduction: new FormControl(introduction),
      id: new FormControl(id),
      companyId: new FormControl(companyId),
    });
  }


  updateSubmit() {
    this.company
      .updateOpportunity(this.updateOpportunity.value)
      .subscribe((upO) => {
        this.ngOnInit();
        this.toCancelTwo();
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
  }

  toCancelTwo() {
    this.UpdateIndicator = false;
  }
}
