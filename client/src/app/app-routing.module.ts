import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { BrowserComponent } from './browser/browser.component';
import { ThanksComponent } from './thanks/thanks.component';
import { BrowserGuard } from './browser.guard';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'browse', component: BrowserComponent, canActivate: [BrowserGuard], pathMatch: 'full', 
    children: [
      { path: 'success', component: SuccessComponent, pathMatch: 'full'}
    ]
  },
  { path: 'thanks', component: ThanksComponent },
  { path: '', component: SignupComponent },
  { path: '**', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }