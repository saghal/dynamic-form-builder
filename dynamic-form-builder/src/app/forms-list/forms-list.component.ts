import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormStructure } from '../common/interface/forms.interface';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css'],
})
export class FormsListComponent implements OnInit {
  @Output() formnameEvent = new EventEmitter<string>();

  constructor(private formService: FormService) {}
  forms: FormStructure[];
  ngOnInit(): void {
    this.getFormsList();
  }

  getFormsList() {
    this.formService.getAllFromIndexedDB().subscribe((forms) => {
      this.forms = forms;
    });
  }

  onClick(formname: string) {
    this.formnameEvent.emit(formname);
  }
}
