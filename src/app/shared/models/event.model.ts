export interface CreateEventModel {
  name: string;
  endDate: string;
  adminId: number;
}

export interface ReadEventModel {
  id: number;
  name: string;
  endDate: string;
  adminId: number;
}

export interface UpdateEventModel {
  id: number;
  name: string;
  endDate: string;
}
