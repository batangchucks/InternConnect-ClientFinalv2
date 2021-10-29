import { Pipe, PipeTransform } from '@angular/core';



import { isoCodeListModel } from './shared/models/isoCodeList.model';
import { ReportsModel } from './shared/models/reports.model';
import { submissionModel } from './shared/models/submission.model';

@Pipe({
  name: 'generateReportFilter',
})
export class reportFilter implements PipeTransform {
  transform(
    submissions: ReportsModel[],
    sectionId: number,
    status: string,
    programId: number
  ): ReportsModel[] {
    if (programId && !sectionId) {
      return submissions.filter(
        (eachSubmit) => eachSubmit.programId == programId
      );
    } else if (status == null && sectionId) {
      console.log('when only section');
      console.log(sectionId);
      return submissions.filter(
        (eachSubmit) => eachSubmit.sectionId == sectionId
      );
    } else if (status != null && sectionId) {
      if (status) {
        if (status == 'Acknowledged') {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.submissionStatus == 'ACCEPTEDBYCOORDINATOR'
          );
        } else if (status == 'approvedbyC') {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.submissionStatus == 'ACCEPTEDBYCHAIR'
          );
        } else if (status == 'approvedD') {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.submissionStatus == 'ACCEPTEDBYDEAN'
          );
        } else if (status == 'sentToCompany') {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.submissionStatus == 'EMAILSENTTOCOMPANY'
          );
        } else if (status == 'approvedByCompany') {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.submissionStatus == 'COMPANYAGREES'
          );
        } else {
          return submissions.filter(
            (eachSubmit) =>
              eachSubmit.sectionId == sectionId &&
              eachSubmit.comments
          );
        }
      }
    }

    // return submissions;

    return submissions;
  }
}
