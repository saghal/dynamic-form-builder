import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormStructure } from '../common/interface/forms.interface';
import { TagsStructure } from './../common/interface/tag.interface';
@Injectable()
export class FormService {
  selectedForm: FormStructure;
  formname: string;
  constructor(private dbService: NgxIndexedDBService) {}
  saveOnIndexedDB(tags: TagsStructure[], formName: string): void {
    // console.log(tags, ':', formName);
    this.dbService
      .add('forms', {
        formName: formName,
        tags: tags,
      })
      .subscribe((key: any) => {
        console.log('key: ', key);
      });
  }

  checkFromNameFromIndexedDB(formName: string): Observable<boolean> {
    return this.dbService
      .getByKey('forms', formName)
      .pipe(map((form) => form === undefined));
  }

  getAllFromIndexedDB(): Observable<any> {
    return this.dbService.getAll('forms');
  }

  getFromIndexedDB(formname): Observable<any> {
    return this.dbService.getByKey('forms', formname);
  }

  showForm(formname: string): void {
    //this.formDetial.callDB(formname);
  }
}
