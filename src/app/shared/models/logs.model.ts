
export interface logsModel {
    adminId: number,
    dateStamped: string,
    id:number,
    submission: {
        adminResponse: {
            acceptedByChair: boolean
            acceptedByCoordinator: boolean
            acceptedByDean: boolean
            comments: string
            companyAgrees: boolean
            emailSentByCoordinator: boolean
            id: number
            submissionId: number
        },
        firstName: string
        lastName: string
        middleInitial:string
        student:{
            account:{
                email: string
                id: number
            }
          
        }
    },
    section: {
        id:number,
        name:string,
        programId:number
    },
    sectionId:number,
    stampFileName:string
 }
 