export interface opportunityModel {
  id: number;
  title: string;
  position: string;
  introduction: string;
  companyId: number;
  dateAdded: string;
  company: {
    name: string;
    addressOne: string;
    addressTwo: string;
    addressThree: string;
    city: string;
    headerFileName: string;
    logoFileName: string;
    description: string;
    id: number;
    contactPersonName: string;
    contactPersonDesignation: string;
    contactPersonEmail: string;
    link: string;
    status: string;
    isActive: boolean;
    dateAdded: string;
    expiration: string;
  };
}
