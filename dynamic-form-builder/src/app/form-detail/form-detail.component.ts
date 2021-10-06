import { TagsStructure } from './../common/interface/tag.interface';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { FormStructure } from '../common/interface/forms.interface';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css'],
})
export class FormDetailComponent implements OnInit {
  tags: TagsStructure[];
  formname: string;
  form: FormStructure;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getFromIndexedDB().subscribe((forms) => {
      this.form = forms[0];
      this.formname = this.form.formName;
      this.tags = this.form.tags;
      console.log('form molaei:', this.form);
    });
  }
}
