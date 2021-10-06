import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagsStructure } from './../common/interface/tag.interface';

@Injectable()
export class FormService {
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
    // {
    //   if (form === undefined) {
    //     flagMolaei.flag = true;
    //     return true;
    //   } else {
    //     flagMolaei.flag = false;
    //     return false;
    //   }
    // }
  }

  getFromIndexedDB(): Observable<any> {
    return this.dbService.getAll('forms');
  }
}
