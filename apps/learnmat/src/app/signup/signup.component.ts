import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: false
})
export class SignupComponent implements OnInit {
  private router = inject(Router);
  private auth = inject(AuthService);


  public signupForm: UntypedFormGroup = new UntypedFormGroup({});

  email = "";

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
