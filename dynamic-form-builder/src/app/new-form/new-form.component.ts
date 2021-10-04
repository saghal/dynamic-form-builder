import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TagStructure } from '../common/interface/tag.interface';
@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewFormComponent implements OnInit {
  inputFrom: FormGroup;
  tagsLength: number = 0;
  inputTags: TagStructure[] = [];
  constructor() {}
  onAddInputeTag(form: TagStructure): void {
    (this.inputFrom.get('tags') as FormArray).push(
      new FormControl([form.inputLabel, form.inputType])
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
  onSave(formName: any): void {
    for (let tag of this.tags) {
      if (tag instanceof FormControl) {
        this.inputTags.push({
          formName: formName.value,
          inputLabel: tag.value[0],
          inputType: tag.value[1],
        });
      }
    }
  }
}
