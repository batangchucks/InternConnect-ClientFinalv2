export interface programModel {
  name: string;
  isoCode: string;
  numberOfHours: string;
  id: number;
  tracks: [
    {
      id: number;
      name: string;
      programId: number;
      isActive: boolean;
    }
  ];
  isoCodeProgramNumber: string;
  practicumStart: string;
  practicumEnd: string;
}

export interface AddProgramModel
{
  name: string,
  isoCodeProgramNumber: string,
  numberOfHours: number,
  practicumStart: string,
  practicumEnd: string
}
