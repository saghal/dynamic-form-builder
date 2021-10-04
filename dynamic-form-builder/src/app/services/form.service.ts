import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
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

  getRowFromIndexedDB(formName: string): void {}
}
