import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

export class FormnameValidators {
  static shouldBeUnique(dbService: NgxIndexedDBService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      dbService.getByKey('forms', control.value).subscribe((form) => {
        console.log('in validtor1: ', control.value);
        if (form === undefined) {
          return { shouldBeUnique: true };
        } else {
          return { shouldBeUnique: false };
        }
      });
      console.log('in validtor2: ', control.value);

      return { shouldBeUnique: false } as any;
    };
  }
}

/*





      this.dbService.getByKey('forms', control.value).subscribe((form) => {
        if (form === undefined) {
          return true;
        } else {
          return false;
        }
      });



*/
