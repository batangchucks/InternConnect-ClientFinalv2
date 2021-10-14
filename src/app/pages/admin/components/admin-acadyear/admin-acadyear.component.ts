import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AcademicyearService } from 'src/app/shared/services/academicyear.service';

@Component({
  selector: 'app-admin-acadyear',
  templateUrl: './admin-acadyear.component.html',
  styleUrls: ['./admin-acadyear.component.scss'],
})
export class AdminAcadyearComponent implements OnInit {
  AcadYearIndicator: boolean = false;
  constructor(
    private date: DatePipe,
    private academicyear: AcademicyearService
  ) {}
  _ayId: number;
  _ayCollegeName: string;
  _ayIgaarpEmail: string;
  _ayStartDate: string;
  _ayEndDate: string;

  _psIgaarpName: string;
  _psDeanName: string;
  _psUstLogoFileName: string;
  _psCollegeLogoFileName: string;

  _deanEmail: string;
  _deanPassword: string;

  ngOnInit(): void {
    this.academicyear.getAcademicYear().subscribe((resp) => {
      this._ayId = resp.id;
      this._ayCollegeName = resp.collegeName;
      this._ayIgaarpEmail = resp.igaarpEmail;
      this._ayStartDate = this.date.transform(resp.startDate, 'yyyy-MM-dd');
      this._ayEndDate = this.date.transform(resp.endDate, 'yyyy-MM-dd');
    });

    this.
  }
  toConfirm() {
    var ayPayload = {
      collegeName: this._ayCollegeName,
      startDate: this._ayStartDate,
      endDate: this._ayEndDate,
      igaarpEmail: this._ayIgaarpEmail,
    };

    var psPayload = {
      igaarpName: this._psIgaarpName,
      deanName: this._psDeanName,
      ustLogoFileName: this._psUstLogoFileName,
      collegeLogoFileName: this._psCollegeLogoFileName,
    };
  }

  toCancel() {
    this.AcadYearIndicator = false;
  }
}
