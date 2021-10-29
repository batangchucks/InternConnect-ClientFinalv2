import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IsoCodeService } from 'src/app/shared/services/iso-code.service';

@Component({
  selector: 'app-admin-iso',
  templateUrl: './admin-iso.component.html',
  styleUrls: ['./admin-iso.component.scss'],
})
export class AdminIsoComponent implements OnInit {
  isoFormRange: FormGroup;
  isoFormSingle: FormGroup;

  coordinatorList: any[];

  payloadRange: any[] = [];
  adminId;

  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private isoCode: IsoCodeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initalizeFormRange();
    this.initalizeFormSingle();
    this.isoCode
      .getCoordinatorData(this.user.admin.programId)
      .subscribe((val: [any]) => {
        this.coordinatorList = val;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
  }
  initalizeFormRange() {
    this.isoFormRange = this.formBuilder.group({
      startvalue: '',
      endvalue: '',
      coordinatorId: '',
    });
  }

  isoSubmitRange() {
    var startValue = this.isoFormRange.get('startvalue').value;
    var endValue = this.isoFormRange.get('endvalue').value;
    var coordinatorValue = this.isoFormRange.get('coordinatorId').value;

    for (startValue; startValue <= endValue; startValue++) {
      this.payloadRange.push({
        code: startValue,
        programId: this.user.admin.programId,
      });
    }

    this.isoCode
      .postIsoCode(this.payloadRange.reverse(), coordinatorValue)
      .subscribe(
        (val) => {
          this.isoFormRange.reset();
        },
        (error) => {
          console.log(error);
          this.isoFormRange.reset();
        }
      );
    this.payloadRange = [];
  }

  initalizeFormSingle() {
    this.isoFormSingle = this.formBuilder.group({
      isoCode: '',
      coordinatorId: '',
    });
  }

  isoSubmitSingle() {
    var isoCodeValue = this.isoFormSingle.get('isoCode').value;
    var coordinatorValue = this.isoFormSingle.get('coordinatorId').value;

    this.payloadRange.push({
      code: isoCodeValue,
      programId: this.user.admin.programId,
    });

    this.isoCode
      .postIsoCode(this.payloadRange.reverse(), coordinatorValue)
      .subscribe(
        (val) => {
          this.isoFormSingle.reset();
          console.log('Iso code posted');
        },
        (error) => {
          console.log(error);
          this.isoFormSingle.reset();
        }
      );
    this.payloadRange = [];
  }
}
