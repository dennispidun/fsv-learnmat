import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { BrowserComponent } from './browser/browser.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ThanksComponent } from './thanks/thanks.component';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { SuccessComponent } from './success/success.component';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BrowserComponent,
    ThanksComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
