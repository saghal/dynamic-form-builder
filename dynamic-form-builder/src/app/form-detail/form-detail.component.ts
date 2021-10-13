import { TagsStructure } from './../common/interface/tag.interface';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { FormStructure } from '../common/interface/forms.interface';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css'],
})
export class FormDetailComponent implements OnInit, OnChanges {
  tags: TagsStructure[];
  @Input() formname: string | undefined;
  form: FormStructure;
  constructor(private formService: FormService) {}
  ngOnChanges(): void {
    if (this.formname !== undefined) {
      this.getFormDetail();
    }
  }
  getFormDetail(): void {
    this.formService.getFromIndexedDB(this.formname).subscribe((form) => {
      this.form = form;
      this.formname = this.form.formName;
      this.tags = this.form.tags;
    });
  }
  ngOnInit(): void {}
}
