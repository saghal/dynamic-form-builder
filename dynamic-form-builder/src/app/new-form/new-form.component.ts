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
    console.log(this.inputFrom.get('tags'));
    /*console.log('here', form.name);
    console.log('formName', form.formName);
    console.log('label: ', form.inputLabel);
    console.log('type', form.inputType);*/
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
    console.log('show us index ', index);
    (this.inputFrom.get('tags') as FormArray).removeAt(index);
  }
}
