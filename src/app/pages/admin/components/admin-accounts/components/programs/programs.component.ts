import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { AddProgramModel, programModel } from 'src/app/shared/models/programs.model';
import { FormControl, FormControlName, FormGroup, NgForm } from '@angular/forms';
import { tracksModel } from 'src/app/shared/models/tracks.model';
import { ReadAcademicYearModel } from 'src/app/shared/models/AcademicYear.model';
import { AcademicyearService } from 'src/app/shared/services/academicyear.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  //pagination
  p: number = 1;

  Program: programModel[] = [];

  DepartmentCodeEnum: string[] = ["1","2","3","4","5","6","7","8","9"]
  CreateProgramIndicator: boolean = false;
  UpdateProgramIndicator: boolean = false;
  DeleteProgramIndicator: boolean = false;

  CreateTrackIndicator: boolean = false;
  UpdateTrackIndicator: boolean = false;
  DeleteTrackIndicator: boolean = false;

  createForm: FormGroup;
  updateProgramF: FormGroup;

  updateTrackF: FormGroup;
  selectedTrack: tracksModel[] = [];
  programId: number;

  academicYear: ReadAcademicYearModel;

  trackId:number;
  constructor(private program: ProgramService, private academicYearService: AcademicyearService,     private date: DatePipe) {}

  ngOnInit(): void {
    this.academicYearService.getAcademicYear().subscribe(resp => {
      this.academicYear = resp;
    })

    this.program.getProgram().subscribe(eachV=> {
      this.Program = eachV;
      var usedDeptCode: string[] = []
      eachV.forEach(elem => {
        usedDeptCode.push(elem.isoCodeProgramNumber)
      });
      this.DepartmentCodeEnum = this.DepartmentCodeEnum.filter(enumers => {
        return !usedDeptCode.includes(enumers);
      })
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   })

    this.formInitalize();

  }

  toCreateProgram() {
    this.CreateProgramIndicator = true;
  }

  toCancelOne() {
    this.CreateProgramIndicator = false;
  }
  toUpdateProgram(eachP: programModel) {
    this.updateProgramF = new FormGroup({
      id: new FormControl(eachP.id),
      name: new FormControl(eachP.name),
      isoCodeProgramNumber: new FormControl(eachP.isoCodeProgramNumber),
      numberOfHours: new FormControl(eachP.numberOfHours),
      practicumStart: new FormControl(
        this.date.transform(eachP.practicumStart, 'yyyy-MM-dd')
      ),
      practicumEnd: new FormControl(
        this.date.transform(eachP.practicumEnd, 'yyyy-MM-dd')
      ),
    });
    this.UpdateProgramIndicator = true;
  }
  submitUpdP() {
    this.program.putProgram(this.updateProgramF.value).subscribe((updated) => {
      this.UpdateProgramIndicator = false;
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  toCancelTwo() {
    this.UpdateProgramIndicator = false;
  }

  toCreateTrack() {
    this.CreateTrackIndicator = true;
  }

  toCancelThree() {
    this.CreateTrackIndicator = false;
  }

  toCancelDP() {
    this.DeleteProgramIndicator = false;
  }

  toCancelDT() {
    this.DeleteTrackIndicator = false;
  }

  toUpdateTrack(id: number, programId: number) {
    this.program.getSingleTrack(id).subscribe((track) => {
      this.selectedTrack = track;
      this.selectedTrack.map((eachT) => {
        this.UpdateTrackIndicator = true;

        this.updateTrackF = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(eachT.name),
          programId: new FormControl(programId),
        });
      });
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });

    // this.UpdateTrackIndicator = true;
  }

  toCancelFour() {
    this.UpdateTrackIndicator = false;
  }
  formInitalize() {
    this.createForm = new FormGroup({
      name: new FormControl(''),
    });
  }
  onSubmitCreate(f: NgForm) {
    var formPayload: AddProgramModel = {
      name: f.value.name,
      isoCodeProgramNumber: f.value.isoCodeProgramNumber,
      numberOfHours: f.value.numberOfHours,
      practicumStart: f.value.practicumStart,
      practicumEnd: f.value.practicumEnd,
    };
    this.program.POSTProgram(formPayload).subscribe(
      (createdP) => {
        this.ngOnInit();
        this.CreateProgramIndicator = false;
      },
      (err) => {
        alert('Something went wrong please try again! ');
        this.ngOnInit();
      }
    );
  }

  toDelete(programId: number) {
    this.DeleteProgramIndicator = true;
    this.programId = programId;

    // this.program.deleteProgram(programId).subscribe((delP) => {
    //   this.ngOnInit();
    // });
  }

  updateTrackSubmit() {
    this.program.updateTrack(this.updateTrackF.value).subscribe((eachT) => {
      this.ngOnInit();
      this.UpdateTrackIndicator = false;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  createTrack(f: NgForm) {
    this.program.POSTtracks(f.value).subscribe((newTrack) => {
      this.ngOnInit();
      this.CreateTrackIndicator = false;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }
  deleteTrack(id: number) {

    this.trackId = id;
    this.DeleteTrackIndicator = true;
    // this.program.deleteTrack(id).subscribe((delTrack) => {
    //   this.ngOnInit();
    // });
  }

  acceptDelete() {
    this.program.deleteProgram(this.programId).subscribe((delP) => {
      console.log(delP);
         this.programId = null;
        this.DeleteProgramIndicator = false;
        this.ngOnInit();

    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });

  }

  trackDeleteAccepted() {
    console.log(this.trackId);
    this.program.deleteTrack(this.trackId).subscribe((delTrack) => {
          this.trackId = null;
          this.DeleteTrackIndicator = false;
          this.ngOnInit();

        },(err)=> {

          alert("Something went wrong please try again! ");
          this.ngOnInit();
       });

  }
}
