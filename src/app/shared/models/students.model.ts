export interface studentModel {
  account: {
    email: string;
    id: number;
  };
  accountId: number;
  addedBy: string;
  dateAdded: Date;
  authId: number;
  id: number;
  program: {
    id: number;
    name: string;
    isoCodeProgramNumber: number;
    isoCode: number;
    numberofHours: number;
  };
  section: {
    id: number;
    name: string;
    programId: number;
  };
  sectionId: number;
}

export interface studentDashboardModel {
  id: number;
  dateAdded: string;
  addedBy: string;
  sectionId: number;
  section: {
    id: number;
    name: string;
    programId: number;
  };
  programId: number;
  program: {
    id: number;
    name: string;
    isoCodeProgramNumber: string;
    numberOfHours: number;
    tracks: [];
  };
  authId: number;
  accountId: number;
  account: {
    id: number;
    email: string;
  };
  submissions: [
    {
      companyId: number;
      adminResponse: {
        id: number;
        acceptedByCoordinator: boolean;
        acceptedByChair: boolean;
        acceptedByDean: boolean;
        emailSentByCoordinator: boolean;
        companyAgrees: boolean;
        comments: string;
        submissionId: number;
      };
    }
  ];
}
