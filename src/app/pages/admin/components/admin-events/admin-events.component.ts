import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ReadEventModel,
  UpdateEventModel,
} from 'src/app/shared/models/event.model';
import { AcademicyearService } from 'src/app/shared/services/academicyear.service';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit {
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  eventList: ReadEventModel[];

  updateForm: FormGroup;
  createForm: FormGroup;
  deleteId: number;
  academicYearStart: string;
  academicYearEnd: string;

  constructor(
    private eventService: EventsService,
    private date: DatePipe,
    private academicyearService: AcademicyearService
  ) {}
  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl(''),
      endDate: new FormControl(''),
      adminId: new FormControl(this.user.admin.id),
    });
    this.eventService.getEvents(this.user.admin.id).subscribe((events) => {
      this.eventList = events;
    });

    this.academicyearService.getAcademicYear().subscribe((aydata) => {
      console.log(this.date.transform(aydata.startDate, 'yyyy-MM-dd'));
      this.academicYearStart = this.date.transform(
        aydata.startDate,
        'yyyy-MM-dd'
      );
      var dateGen = new Date();
      var today =
        dateGen.getFullYear() +
        '-' +
        (dateGen.getMonth() + 1) +
        '-' +
        dateGen.getDate();
      this.academicYearStart = today;
      this.academicYearEnd = this.date.transform(aydata.endDate, 'yyyy-MM-dd');
    });
  }

  onAddEvent() {
    this.eventService.addEvents(this.createForm.value).subscribe((resp) => {
      this.ngOnInit();
    });
  }

  toCancel() {
    this.DeleteIndicator = false;
  }

  onUpdate(eventData: UpdateEventModel) {
    this.updateForm = new FormGroup({
      id: new FormControl(eventData.id),
      name: new FormControl(eventData.name),
      endDate: new FormControl(
        this.date.transform(eventData.endDate, 'yyyy-MM-dd')
      ),
    });
    this.UpdateIndicator = true;
  }

  onUpdateEvent() {
    this.eventService.updateEvent(this.updateForm.value).subscribe((resp) => {
      this.ngOnInit();
    });
  }

  onDeleteEvent(eventData: UpdateEventModel) {
    this.DeleteIndicator = true;
    this.deleteId = eventData.id;
  }

  confirmDelete() {
    this.eventService.deleteEvent(this.deleteId).subscribe((resp) => {
      console.log('Successfully deleted');
      this.DeleteIndicator = false;
      this.ngOnInit();
    });
    this.deleteId = null;
  }

  toCancelTwo() {
    this.UpdateIndicator = false;
  }
}
