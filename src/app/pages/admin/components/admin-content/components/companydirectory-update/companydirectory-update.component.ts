import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-companydirectory-update',
  templateUrl: './companydirectory-update.component.html',
  styleUrls: ['./companydirectory-update.component.scss']
})
export class CompanydirectoryUpdateComponent implements OnInit {
  CreateIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  updateCompany! :FormGroup;
  createCompany!:FormGroup;

  Companies: CompanyModel[] = [];

  constructor(private company: CompanyService) { }

  ngOnInit(): void {
    this.company.getCompany().subscribe(eC=>{
      this.Companies = eC;
    })
  }
  deleteCompany(eachCid:number) {
    this.company.deleteCompany(eachCid).subscribe(response=>{
      this.ngOnInit();
    });
  }
  toCreate() { 
    this.CreateIndicator = true;
  } 

  toCancelOne() { 
    this.CreateIndicator = false;
  } 
  toCancelTwo() {
    this.UpdateIndicator = false;
  } 

  toUpdate(toUpdateCompany:CompanyModel) { 
    this.UpdateIndicator = true;
    const name = toUpdateCompany.name;
    const description = toUpdateCompany.description;
    const addressOne = toUpdateCompany.addressOne;
    const addressTwo = toUpdateCompany.addressTwo;
    const addressThree = toUpdateCompany.addressThree;
    const city = toUpdateCompany.city;
    const headerFileName = toUpdateCompany.headerFileName;
    const logoFileName = toUpdateCompany.logoFileName;
    const contactPersonName = toUpdateCompany.contactPersonName;
    const contactPersonDesignation = toUpdateCompany.contactPersonDesignation;
    const contactPersonEmail = toUpdateCompany.contactPersonEmail;
    const link = toUpdateCompany.link;
    const id =toUpdateCompany.id;

    this.updateCompany = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'addressOne':new FormControl(addressOne,Validators.required),
      'addressTwo':new FormControl(addressTwo,Validators.required),
      'addressThree':new FormControl(addressThree,Validators.required),
      'city':new FormControl(city,Validators.required),
     
      'contactPersonName':new FormControl(contactPersonName,Validators.required),
      'contactPersonDesignation':new FormControl(contactPersonDesignation,Validators.required),
      'contactPersonEmail':new FormControl(contactPersonEmail,Validators.required),
      'link':new FormControl(link,Validators.required),
      'id':new FormControl(id,Validators.required),
    
    });
  } 
  onSubmitCreate(f:NgForm) {
   
    this.company.createCompany(f.value).subscribe(createdC=> {
      console.log(createdC);
      this.ngOnInit();
      this.toCancelOne();
    })
  }
  updateSubmit() {
    
    this.company.updateCompany(this.updateCompany.value).subscribe(change=> {
      this.toCancelTwo();
      this.ngOnInit();
    });

  }

 

}
