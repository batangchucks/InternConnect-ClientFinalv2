export interface programModel {
    name:string,
    isoCode:string,
    numberOfHours:string,
    id:number,
    tracks:[{
        id:number,
        name:string,
        programId:number
    }],
    isoCodeProgramNumber:string
        
 }