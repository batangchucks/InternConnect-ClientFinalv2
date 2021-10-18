import { Pipe, PipeTransform } from '@angular/core';



import { isoCodeListModel } from './shared/models/isoCodeList.model';
import { submissionModel } from './shared/models/submission.model';

@Pipe({
  name: 'generateReportFilter',
})
export class reportFilter implements PipeTransform {
  transform(submissions: submissionModel[],sectionId:number,status:string): submissionModel[] {
    console.log(status);
    if (!sectionId || !submissions ) {
        console.log("going here");
        console.log(sectionId);
        console.log(status);
        console.log(submissions);
      return submissions;
    }
    else if (status == null && sectionId) {
        console.log("when only section");
        console.log(sectionId);
        return submissions.filter((eachSubmit) => eachSubmit.student.section.id == sectionId);
       
    }
    else if(status !=null && sectionId) {
      
        if(status) {
            if(status == 'Acknowledged') {
                return submissions.filter((eachSubmit) =>eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.acceptedByCoordinator == true);
            }
            else if(status == 'approvedbyC') {
                return submissions.filter((eachSubmit) =>eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.acceptedByChair == true);
            }
            else if(status == 'approvedD') {
                return submissions.filter((eachSubmit) =>eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.acceptedByDean == true);
            }
            else if(status == 'sentToCompany') {
                return submissions.filter((eachSubmit) => eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.emailSentByCoordinator == true);
            }
            else if(status == 'approvedByCompany') {
                return submissions.filter((eachSubmit) => eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.companyAgrees == true);
            }
            else {
             
              return submissions.filter((eachSubmit) =>(eachSubmit.student.section.id == sectionId && eachSubmit.adminResponse.comments));
               
            }

           
        }
        
    }

    // return submissions;

  
    return submissions;

    

   
  }
}
