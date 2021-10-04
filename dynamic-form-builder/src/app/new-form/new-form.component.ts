import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TagsStructure, TagStructure } from '../common/interface/tag.interface';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewFormComponent implements OnInit {
  inputFrom: FormGroup;
  tagsLength: number = 0;
  inputTags: TagsStructure[] = [];
  formNameIsUnique: boolean = false;
  constructor(
    private formService: FormService,
    private dbService: NgxIndexedDBService
  ) {}

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

  formNameUniqueness(formName: any): void {
    let result = this.formService.checkFromNameFromIndexedDB(formName.value);
    if (result === true || result === false) this.formNameIsUnique = result;
  }

  onSave(formName: AbstractControl | null): void {
    for (let tag of this.tags) {
      if (tag instanceof FormControl) {
        this.inputTags.push({
          inputLabel: tag.value[0],
          inputType: tag.value[1],
        });
      }
    }

    this.formService.saveOnIndexedDB(this.inputTags, formName?.value);
    this.dbService.getByKey('forms', 'form 1').subscribe((form) => {
      console.log(form);
    });
  }
}
