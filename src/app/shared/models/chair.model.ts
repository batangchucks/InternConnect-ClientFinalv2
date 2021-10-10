
export interface chairModel {
    account: {
        email:string,
        id:number
    },
    accountId:number,
    authId:number,
    id:number,
    program: {
        id:number,
        name:string,
        isoCodeProgramNumber:number,
        isoCode:number,
        numberofHours:number
    },
    section: {
        id:number,
        name:string,
        programId:number
    },
    sectionId:number,
    stampFileName:string
 }
 