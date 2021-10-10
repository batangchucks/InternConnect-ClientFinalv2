import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {
  email: string;
  resetKey: string;
  onboardForm: FormGroup;
  confirmpassword: string;
  isLoggedIn:boolean = true;
  constructor(
    private account: createAccount,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.resetKey = params['resetkey'];
      console.log(this.email);
      console.log(this.resetKey);
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
    // console.log(f.value);
    //   this.account.resetPassword(f.value).subscribe(newUser=> {
    //     console.log(newUser);
    //   })
    const password = this.onboardForm.get('password').value;
    console.log(this.confirmpassword);
    if (password === this.confirmpassword) {
      this.isLoggedIn = true;
      this.account
        .resetPassword(this.onboardForm.value)
        .subscribe((resettedU) => {
        
          this.router.navigate(['/login']);
        });

    }
    else {
      this.isLoggedIn = false
    }
  }
  onClick() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
