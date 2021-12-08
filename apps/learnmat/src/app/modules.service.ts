import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LearningModule } from './learning-module.model';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private http: HttpClient) { }

  public getModules(token: string) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + token);

    return this.http.get<LearningModule[]>(environment.apiUrl + "/modules", {headers});
  }

  public getLinks(token: string, modules: {modules: LearningModule[]}) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + token);
      return this.http.post<LearningModule[]>(environment.apiUrl + "/modules", modules, {headers});
  }

}
