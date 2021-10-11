import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  TagsStructure,
  TagStructure,
  tagValue,
} from '../common/interface/tag.interface';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewFormComponent implements OnInit {
  inputFrom: FormGroup;
  tagsLength: number = 0;
  valueLength: number = 0;
  inputTags: TagsStructure[] = [];
  inValues: tagValue[] = [];
  formNameIsUnique: boolean = false;
  constructor(
    private formService: FormService,
    private dbService: NgxIndexedDBService,
    private router: Router
  ) {}

  onAddInputeTag(form: TagStructure): void {
    console.log('in add input tag : ', this.inValues);
    (this.inputFrom.get('tags') as FormArray).push(
      new FormControl([form.inputLabel, form.inputType, this.inValues])
    );
    this.inValues = [];
    this.tagsLength = (this.inputFrom.get('tags') as FormArray).value.length;
    console.log('show tags ,', this.inputFrom.get('tags'));
  }
  onAddValueToTag(value: string) {
    this.inValues.push({ value: value });
  }
  onRemoveValue(iv: any) {
    let index = this.inValues.indexOf(iv);
    this.inValues.splice(index, 1);
    console.log('print iv ,', this.inValues);
  }
  ngOnInit(): void {
    this.inputFrom = new FormGroup({
      formName: new FormControl(null, Validators.required),
      inputType: new FormControl(null, Validators.required),
      inputLabel: new FormControl(null, Validators.required),
      inputValue: new FormArray([]),
      tags: new FormArray([]),
    });
  }

  get tags(): any {
    //type of this controls
    return (this.inputFrom.get('tags') as FormArray).controls;
  }

  get inputValue(): any {
    return (this.inputFrom.get('inputValue') as FormArray).controls;
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
    this.formService
      .checkFromNameFromIndexedDB(formName.value)
      .subscribe((result) => {
        this.formNameIsUnique = result;
      });
  }

  onSave(formName: AbstractControl | null): void {
    for (let tag of this.tags) {
      if (tag instanceof FormControl) {
        this.inputTags.push({
          inputLabel: tag.value[0],
          inputType: tag.value[1],
          inputValue: tag.value[2],
        });
      }
    }

    this.formService.saveOnIndexedDB(this.inputTags, formName?.value);
    this.dbService.getByKey('forms', 'form 1').subscribe((form) => {
      console.log(form);
    });
    this.router.navigate(['/forms']);
  }
}
