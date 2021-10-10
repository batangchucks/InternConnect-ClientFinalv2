import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { opportunityModel } from 'src/app/shared/models/opportunity.model';
import { CompanyModel } from 'src/app/shared/models/company.model';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-opportunities-update',
  templateUrl: './opportunities-update.component.html',
  styleUrls: ['./opportunities-update.component.scss']
})
export class OpportunitiesUpdateComponent implements OnInit {
  Opportunities:opportunityModel[]=[];
  CreateIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  updateOpportunity!:FormGroup;
  Company:CompanyModel[] = [];

  constructor(private company: CompanyService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.company.getOpportunity().subscribe(eO=>{
      this.Opportunities = eO;
    });
    this.company.getCompany().subscribe(eC=>{
      this.Company = eC;
    })

    // this.company.POST_Opportunity();
  }
  deleteOpportunity(index:number) {
   
    this.company.deleteByOpportunity(index).subscribe(response=>{
      this.ngOnInit();
    },error=>{
      this.ngOnInit();
    });
  
  }
  createOpportunitySubmit(f:NgForm) {
    
    this.company.createOpportunity(f.value).subscribe(crO=> {
      this.toCancelOne();
      this.ngOnInit();
    })
  }
  toCreate() { 
    this.CreateIndicator = true;
  } 

  toCancelOne() { 
    this.CreateIndicator = false;
  } 

  toUpdate(eO:opportunityModel) { 
    this.UpdateIndicator = true;
    console.log(eO);
    const title = eO.title;
    const position = eO.position;
    const introduction = eO.introduction;
    const id = eO.id;
    const companyId = eO.companyId;

    this.updateOpportunity = new FormGroup({
      'title': new FormControl(title),
      'position': new FormControl(position),
      'introduction':new FormControl(introduction),
      'id':new FormControl(id),
      'companyId':new FormControl(companyId),
    });

  } 
  updateSubmit() {
    this.company.updateOpportunity(this.updateOpportunity.value).subscribe(upO=>{
     console.log(upO);
      
      this.ngOnInit();
      this.toCancelTwo();
    });
  }

  toCancelTwo() {
    this.UpdateIndicator = false;
  } 

}
