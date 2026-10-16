import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { LearningModule } from '../learning-module.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../success/success.component';
import { ModulesService } from '../modules.service';
import { MatSelectionList } from '@angular/material/list';

@Component({
    selector: 'app-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.css'],
    standalone: false
})
export class BrowserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  private modulesService = inject(ModulesService);


  modules: LearningModule[] = [];
  selection: string[] = [];

  @ViewChild('modulesList') 
  modulesList?: MatSelectionList;

  private token: string | null = null;

  ngOnInit() : void {
    
    this.token = this.route.snapshot.queryParamMap.get("token");
    if (this.token) {
      this.modulesService.getModules(this.token).toPromise().then((data: any) => {
        this.modules = data.modules;
      })
    }    
  }

  onNgModelChange(event: any){
    this.selection = event.source._value;
  }

  getLinks() {
    if (this.selection.length == 0) {
      this._snackBar.open("Wähle bitte ein Lernmaterial-Modul aus!", "Okay", {
        duration: 3500
      });
    } else {
      const selectedModules = {modules: this.modules.filter(m => this.selection.find(s => m.name === s) !== undefined)}
      
      this.modulesList?.deselectAll()
      this.selection = [];
      this._snackBar.openFromComponent(SuccessComponent, {
        duration: 3500
      });

      this.modulesService.getLinks(this.token || "", selectedModules).toPromise();

    }

    
  }

}
