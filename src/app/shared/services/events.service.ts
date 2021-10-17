import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  CreateEventModel,
  ReadEventModel,
  UpdateEventModel,
} from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  getEvents(adminId: number): Observable<ReadEventModel[]> {
    return this.http.get<ReadEventModel[]>(
      this.apiUrl + 'api/Event/all/' + adminId
    );
  }

  addEvents(payload: CreateEventModel): Observable<ReadEventModel> {
    return this.http.post<ReadEventModel>(
      this.apiUrl + 'api/Event/' + payload.adminId,
      payload
    );
  }

  updateEvent(payload: UpdateEventModel): Observable<ReadEventModel> {
    return this.http.put<ReadEventModel>(
      this.apiUrl + 'api/Event/admin',
      payload
    );
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'api/Event/' + id);
  }
}
