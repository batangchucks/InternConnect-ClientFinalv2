import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReadAcademicYearModel } from 'src/app/shared/models/AcademicYear.model';
import {
  ReadEventModel,
  UpdateEventModel,
} from 'src/app/shared/models/event.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { AcademicyearService } from 'src/app/shared/services/academicyear.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { ProgramService } from 'src/app/shared/services/program.service';

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
  createToday: string

  programData: programModel;
  modalAppear:boolean = false;
  constructor(
    private eventService: EventsService,
    private date: DatePipe,
    private programService: ProgramService
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

    this.programService.getSingleProgram(this.user.admin.programId).subscribe(resp => {
      resp[0].practicumStart = this.date.transform(resp[0].practicumStart, 'yyyy-MM-dd')
      resp[0].practicumEnd = this.date.transform(resp[0].practicumEnd, 'yyyy-MM-dd')
      this.programData = resp[0];
    })
      var dateGen = new Date();
      var today =
        dateGen.getFullYear() +
        '-' +
        (dateGen.getMonth() + 1) +
        '-' +
      dateGen.getDate();
    this.createToday = today;

  }

  onAddEvent() {

    this.modalAppear = true;
    this.eventService.addEvents(this.createForm.value).subscribe((resp) => {
      this.ngOnInit();
      this.modalAppear = false;
    },(err:Error)=> {
      alert("An error has occured");
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
    this.modalAppear = true
    this.eventService.updateEvent(this.updateForm.value).subscribe((resp) => {
      this.UpdateIndicator = false;
      this.ngOnInit();

      this.modalAppear = false;
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }

  onDeleteEvent(eventData: UpdateEventModel) {
    this.DeleteIndicator = true;
    this.deleteId = eventData.id;
  }

  confirmDelete() {
    this.eventService.deleteEvent(this.deleteId).subscribe((resp) => {

      this.DeleteIndicator = false;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
    this.deleteId = null;
  }

  toCancelTwo() {
    this.UpdateIndicator = false;
  }
}
