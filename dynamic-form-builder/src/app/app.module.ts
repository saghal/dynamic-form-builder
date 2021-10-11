import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFormComponent } from './new-form/new-form.component';
import { FormService } from './services/form.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormnameValidators } from './common/validators/formname.validators';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormsComponent } from './forms/forms.component';
import { NavbarComponent } from './navbar/navbar.component';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'forms',
      storeConfig: { keyPath: 'formName', autoIncrement: false },
      storeSchema: [
        { name: 'tags', keypath: 'tags', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent, NewFormComponent, FormsListComponent, FormDetailComponent, FormsComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [FormService, FormnameValidators],
  bootstrap: [AppComponent],
})
export class AppModule {}
