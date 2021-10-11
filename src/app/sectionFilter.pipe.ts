import { Pipe, PipeTransform } from '@angular/core';
import { CompanyModel } from './shared/models/company.model';
import { isoCodeListModel } from './shared/models/isoCodeList.model';
import { sectionModel } from './shared/models/section.model';

@Pipe({
  name: 'sectionFilter'
})
export class sectionFilter implements PipeTransform {

  transform(isoCodeList:isoCodeListModel[],sectionId:number): isoCodeListModel[] {
    
    if(!isoCodeList || !sectionId) {
      return isoCodeList;
    }
    return isoCodeList.filter(eachIso =>
     eachIso.admin.section.id == sectionId);
  }



  }


