import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  formname: string;
  constructor() {}

  ngOnInit(): void {}

  receiveFormname($event) {
    this.formname = $event;
    console.log('form name in forms: ', $event);
  }
}
