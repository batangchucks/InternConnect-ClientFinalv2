import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-companydirectory',
  templateUrl: './companydirectory.component.html',
  styleUrls: ['./companydirectory.component.scss']
})
export class CompanydirectoryComponent implements OnInit {

  companySearch!:string;
  companyFound!:boolean;
  searchedCompany:CompanyModel[] = [];
  newelySearched:CompanyModel[] = [];

  constructor(private company: CompanyService,private router:Router) { }

  ngOnInit(): void {
   
    this.company.getCompany().subscribe(eachC=> {   
      this.searchedCompany = eachC;
      console.log(this.searchedCompany);
    });
    

  }
 


}
