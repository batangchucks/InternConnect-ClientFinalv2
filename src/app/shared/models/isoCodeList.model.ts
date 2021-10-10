export interface isoCodeListModel {
    adminEmail: string,
    adminId: number,
    code: number,
    id: number,
    programId: number,
    submissionId: number
    used: boolean
    admin: {
        accountId: number
        authId: number
        id: number,
        program:{
            id: number
            isoCode: number
            isoCodeProgramNumber: string
            name: string
            numberOfHours: number
        },
        section:{
            id: number
            name: string
            programId:number
        }
    },
    program: {
        id: number, 
        name: string, 
        isoCodeProgramNumber: number,
        isoCode: number, 
        numberOfHours: number
    }



  
}
