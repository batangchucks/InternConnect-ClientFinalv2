import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';

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
  isLoggedIn: boolean = true;
  disabled: boolean = true;
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
    });
  }
  initalizeForm() {
    this.onboardForm = new FormGroup({
      email: new FormControl(this.email.toLowerCase()),
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
      this.account
        .resetPassword(this.onboardForm.value)
        .subscribe((resettedU) => {
          this.router.navigate(['/login']);
        });
    } else {
      this.isLoggedIn = false;
    }
  }
  onClick() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
