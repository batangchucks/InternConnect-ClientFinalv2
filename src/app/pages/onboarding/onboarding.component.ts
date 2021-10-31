import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';

const re = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  email: string = '1';
  resetKey: string;
  onboardForm: FormGroup;
  confirmpassword: string;
  userAgreement: boolean = true;
  isLoggedIn: boolean = true;
  disabled: boolean = true;
  passwordInvalid: boolean = false;
  constructor(
    private account: createAccount,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.resetKey = params['resetkey'];
      this.initalizeForm();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }
  initalizeForm() {
    this.onboardForm = new FormGroup({
      email: new FormControl(this.email.toLowerCase()),
      resetkey: new FormControl(this.resetKey),
      password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern("/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/")]),
    });
  }
  onSubmit() {
    //   this.account.resetPassword(f.value).subscribe(newUser=> {

    //   })

    if(!re.test(this.onboardForm.get("password").value)){
      this.passwordInvalid = true;

      return;
    }


    const password = this.onboardForm.get('password').value;

    if (password === this.confirmpassword) {
      this.isLoggedIn = true;
      this.account
        .resetPassword(this.onboardForm.value)
        .subscribe((resettedU) => {
          this.router.navigate(['/login']);
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });
    } else {
      this.isLoggedIn = false;
    }
  }
  onClick() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  closeAgreement(){
    this.userAgreement = false;
  }
}
