export interface adminModel {
  accountId: number;
  authId: number;
  id: number;
  program: number;
  programId: number;
  section: number;
  sectionId: number;
  stampFileName: string;
}

export interface AdminUpdateSection {
  id: number,
  sectionId: number;
}

export interface AdminUpdateProgram {
  id: number,
  programId: number
}
