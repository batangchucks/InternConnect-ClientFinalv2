import { Pipe, PipeTransform } from '@angular/core';
import { CompanyModel } from './shared/models/company.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(searchedCompany:CompanyModel[],companySearch:string): CompanyModel[] {
    if(!searchedCompany || !companySearch) {
      return searchedCompany;
    }
    return searchedCompany.filter(eachC =>
      eachC.name.toLocaleLowerCase().includes(companySearch.toLocaleLowerCase()));
  }

}
