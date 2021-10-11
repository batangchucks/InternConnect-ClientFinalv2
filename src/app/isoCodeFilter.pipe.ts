
import { Pipe, PipeTransform } from '@angular/core';

import { CompanyModel } from './shared/models/company.model';
import { isoCodeListModel } from './shared/models/isoCodeList.model';

@Pipe({
  name: 'isoCodeFilter'
})
export class isoCodeFilter implements PipeTransform {

  transform(isoCodeList:isoCodeListModel[],indicator: boolean): isoCodeListModel[] {
     console.log(indicator);
     console.log(typeof(indicator));
    if(!isoCodeList || indicator == null) {
      return isoCodeList;
    }
   
    return isoCodeList.filter(eachIso =>
        eachIso.used == indicator);
 
  }

}
