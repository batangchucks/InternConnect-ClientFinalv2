export interface opportunityModel {
  
      id:number,
      title:string,
      position:string,
      introduction:string,
      companyId:number,
      company:{
      id:string,
      name:string,
      addressOne:string,
      addressTwo:string,
      addressThree:string,
      city:string,
      headerFileName:string,
      logoFileName:string,
      description:string
      }
}