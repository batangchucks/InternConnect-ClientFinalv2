export interface userModel {
    email:string;
    admin: {
        id:number,
        stampFileName:string,
        authId:number,
        sectionId:number,
        accountId:number,
        programId:number
        logs:[],
        events:[]
    },
    student:string,
    token:string,
    id:number
 }