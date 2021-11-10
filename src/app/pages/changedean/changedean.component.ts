import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';
@Component({
  selector: 'app-changedean',
  templateUrl: './changedean.component.html',
  styleUrls: ['./changedean.component.scss']
})
export class ChangedeanComponent implements OnInit {

  oldemail:string;
  newemail: string = '1';
  resetKey: string;
  onboardForm: FormGroup;
  confirmpassword: string;
  isLoggedIn: boolean = true;
  disabled: boolean = true;
  constructor(
    private account: createAccount,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.newemail = params['newemail'];
      this.resetKey = params['resetkey'];
      this.oldemail = params['oldemail']
      this.initalizeForm();
    },(err:Error)=> {

      this.ngOnInit();
    });
  }
  initalizeForm() {

    this.onboardForm = new FormGroup({
      email: new FormControl(this.newemail.toLowerCase()),
      resetkey: new FormControl(this.resetKey),
      password: new FormControl(''),

    });
  }
  onSubmit() {
    //   this.account.resetPassword(f.value).subscribe(newUser=> {

    //   })
    const password = this.onboardForm.get('password').value;

    if (password === this.confirmpassword) {
      this.isLoggedIn = true;
      this.account.onBoardNewDean(this.onboardForm.value,this.oldemail).subscribe(newAcc=> {
        this.router.navigate(['/login']);
      },(err:Error)=> {
        this.ngOnInit();
      })
    } else {
      this.isLoggedIn = false;
    }
  }
  onClick() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
