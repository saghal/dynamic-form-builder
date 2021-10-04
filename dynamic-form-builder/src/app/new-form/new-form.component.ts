import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewFormComponent implements OnInit {
  inputFrom: FormGroup;
  tagsLength: number = 0;
  constructor(fb: FormBuilder) {
    /*  this.inputFrom = fb.group({
      formName: [],
      inputType: [],
      inputType: [],
      tags: fb.array([]),
    });*/
  }
  onAddInputeTag(form: {
    formName: string;
    inputType: string;
    inputLabel: string;
  }): void {
    console.log(form);
    (this.inputFrom.get('tags') as FormArray).push(
      new FormControl([form.inputLabel, form.inputType])
    );
    console.log(
      'tags length: ',
      (this.inputFrom.get('tags') as FormArray).value.length
    );
    this.tagsLength = (this.inputFrom.get('tags') as FormArray).value.length;
  }
  ngOnInit(): void {
    this.inputFrom = new FormGroup({
      formName: new FormControl(null, Validators.required),
      inputType: new FormControl(null, Validators.required),
      inputLabel: new FormControl(null, Validators.required),
      tags: new FormArray([]),
    });
  }

  get tags(): any {
    //type of this controls
    return (this.inputFrom.get('tags') as FormArray).controls;
  }
  get formName(): AbstractControl | null {
    return this.inputFrom.get('formName');
  }
  get inputLabel(): AbstractControl | null {
    return this.inputFrom.get('inputLabel');
  }
  get inputType(): AbstractControl | null {
    return this.inputFrom.get('inputType');
  }
  onRemove(tag: FormControl): void {
    let index = this.tags.indexOf(tag);
    (this.inputFrom.get('tags') as FormArray).removeAt(index);
    this.tagsLength = (this.inputFrom.get('tags') as FormArray).value.length;
  }
  onSave(): void {
    for (let tag of this.tags) {
      if (tag instanceof FormControl) {
        console.log('label', tag.value[0]);
      }
    }
  }
}
