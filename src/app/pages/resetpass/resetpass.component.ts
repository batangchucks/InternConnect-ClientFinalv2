import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';

const re = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss'],
})
export class ResetpassComponent implements OnInit {
  email: string;
  resetKey: string;
  onboardForm: FormGroup;
  passwordInvalid: boolean = false;
  confirmpassword: string;
  isLoggedIn: boolean = true;
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
      password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$')]),
    });
  }
  onSubmit() {

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
          alert("Password Successfully Resetted")
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
}
