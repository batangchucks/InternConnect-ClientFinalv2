import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {
  constructor(private Acc: createAccount) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    this.Acc.ForgotPassword(f.controls.email.value).subscribe((email) => {
      console.log(email);
      f.resetForm();
    });

    // this.Acc.ForgotPassword(f.value).subscribe(forgotPass=> {

    // });
  }
}
