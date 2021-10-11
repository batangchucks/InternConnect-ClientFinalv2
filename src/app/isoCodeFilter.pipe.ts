import { Pipe, PipeTransform } from '@angular/core';

import { CompanyModel } from './shared/models/company.model';
import { isoCodeListModel } from './shared/models/isoCodeList.model';

@Pipe({
  name: 'isoCodeFilter',
})
export class isoCodeFilter implements PipeTransform {
  transform(
    isoCodeList: isoCodeListModel[],
    indicator: boolean
  ): isoCodeListModel[] {
    if (!isoCodeList || indicator == null) {
      return isoCodeList;
    }

    return isoCodeList.filter((eachIso) => eachIso.used == indicator);
  }
}
