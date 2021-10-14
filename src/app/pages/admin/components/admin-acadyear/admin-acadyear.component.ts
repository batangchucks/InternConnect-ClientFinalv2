import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicyearService } from 'src/app/shared/services/academicyear.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-admin-acadyear',
  templateUrl: './admin-acadyear.component.html',
  styleUrls: ['./admin-acadyear.component.scss'],
})
export class AdminAcadyearComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  AcadYearIndicator: boolean = false;
  constructor(
    private date: DatePipe,
    private academicyear: AcademicyearService,
    private File: fileUpload,
    private router: Router
  ) {}
  _ayId: number;
  _ayCollegeName: string;
  _ayIgaarpEmail: string;
  _ayStartDate: string;
  _ayEndDate: string;

  selectedFileUpOne: File = null;
  selectedFileUpTwo: File = null;
  imageSrc: string;
  univPhotoFileName: string;

  _psId: number;
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

    this.academicyear.getPdfState().subscribe((resp) => {
      this._psId = resp.id;
      this._psIgaarpName = resp.igaarpName;
      this._psDeanName = resp.deanName;
      this._psUstLogoFileName = resp.ustLogoFileName;
      this._psCollegeLogoFileName = resp.collegeLogoFileName;
    });
  }
  toConfirmReset() {
    var resetPayload = {
      email: this.user.email,
      password: this._deanPassword,
    };
    console.log(resetPayload);
    this.academicyear
      .resetYear(this._ayStartDate, this._ayEndDate, resetPayload)
      .subscribe(
        (resp) => {
          this.router.navigate(['/admin']);
        },
        (err: Error) => console.log(err.message)
      );
  }

  toReset() {
    this.AcadYearIndicator = true;
  }

  toCancel() {
    this.AcadYearIndicator = false;
  }

  toUpdate() {
    var ayPayload = {
      id: this._ayId,
      collegeName: this._ayCollegeName,
      igaarpEmail: this._ayIgaarpEmail,
    };
    this.academicyear.updateAcademicYear(ayPayload).subscribe((resp) => {});

    var psPayload = {
      id: this._psId,
      igaarpName: this._psIgaarpName,
      deanName: this._psDeanName,
      ustLogoFileName: this._psUstLogoFileName,
      collegeLogoFileName: this._psCollegeLogoFileName,
    };

    this.academicyear.updatePdfState(psPayload).subscribe((resp) => {
      alert('Successfully updated');
      this.router.navigate(['/admin']);
      this.ngOnInit();
    });
  }

  UnivLogoUp(event) {
    this.selectedFileUpOne = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append(
      'files',
      this.selectedFileUpOne,
      this.selectedFileUpOne.name
    );

    this.File.uploadLanding(formData).subscribe((data: any) => {
      this._psUstLogoFileName = data.toString();
    });
  }

  CollegeLogoUp(event) {
    this.selectedFileUpTwo = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append(
      'files',
      this.selectedFileUpTwo,
      this.selectedFileUpTwo.name
    );

    this.File.uploadLanding(formData).subscribe((data: any) => {
      this._psCollegeLogoFileName = data.toString();
    });
  }
}
