import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: UntypedFormGroup = new UntypedFormGroup({});

  email = "";

  constructor(private router: Router, private auth: AuthService) {
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern(".+@uni-hildesheim.de")])
    });
  }

  signup(value: any) {
    if (this.signupForm.valid) {
      this.auth.signup(value.email).then((success) => {
        this.router.navigate(['thanks']);
      });
    }
  }

}
