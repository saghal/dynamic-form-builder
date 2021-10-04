import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFormComponent } from './new-form/new-form.component';
import { FormService } from './services/form.service';

@NgModule({
  declarations: [AppComponent, NewFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [FormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
