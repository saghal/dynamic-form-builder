import { Component, OnInit } from '@angular/core';
import { FormStructure } from '../common/interface/forms.interface';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css'],
})
export class FormsListComponent implements OnInit {
  constructor(private formService: FormService) {}
  forms: FormStructure[];
  ngOnInit(): void {
    this.getFormsList();
  }

  getFormsList() {
    this.formService.getFromIndexedDB().subscribe((forms) => {
      this.forms = forms;
      console.log('forms molaei:', this.forms);
    });
  }
}
