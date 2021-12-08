import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup = new FormGroup({});

  email: string = "";

  constructor(private router: Router, private auth: AuthService) {
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(".+@uni-hildesheim\.de")])
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
