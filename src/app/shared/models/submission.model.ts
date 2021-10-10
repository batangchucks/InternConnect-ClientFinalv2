
export interface submissionModel {
    id:number,
    isoCode:number,
    submissionDate:Date,
    lastName:string,
    firstName:string,
    middleInitial:string,
    studentNumber:number,
    contactPersonTitle:string,
    contactPersonFirstName:string,
    contactPersonLastName:string,
    contactPersonEmail:string,
    contactPersonPosition:string,
    acceptanceLetterFileName:string,
    companyProfileFileName:string,
    jobDescription:string,
    trackId:number,
    studentId:number,
    companyId:number,
    studentTitle:string
    
    company: {
      id: 0,
      name: string,
      link: string,
      addressOne: string,
      addressTwo: string,
      addressThree: string,
      city: string,
      headerFileName: string,
      logoFileName: string,
      description: string,
      contactPersonName: string,
      contactPersonEmail: string,
      contactPersonDesignation: string
    },
    student: {
      account: {
        id: number,
        email: string
      }
        id: number,
        dateAdded: Date,
        addedBy: string,
        sectionId: number,
        section: {
          id: number,
          name: string,
          programId: number
    }
  },

    adminResponse: {
      id: number,
      acceptedByCoordinator: boolean,
      acceptedByChair: boolean,
      acceptedByDean: boolean,
      emailSentByCoordinator: boolean,
      companyAgrees: boolean,
      comments: string,
      submissionId: number
    },
    
      
  
}
 