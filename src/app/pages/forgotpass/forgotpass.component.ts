import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';

const re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {

  pwValidation: boolean = false;
  originalButton: boolean = true;
  loadingButton: boolean = false;
  doneButton: boolean = false;

  userAccount: string;

  constructor(private Acc: createAccount) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    if(!re.test(f.value.email)){
      this.pwValidation = true;
      console.log(f.value.email);
      return;
    }
    this.originalButton = false;
    this.loadingButton = true;
    this.Acc.ForgotPassword(f.controls.email.value).subscribe((email) => {
      this.userAccount = f.value.email;
      this.pwValidation = false;
      f.resetForm();
      this.loadingButton = false;
      this.doneButton = true;
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });

    // this.Acc.ForgotPassword(f.value).subscribe(forgotPass=> {

    // });
  }
}
