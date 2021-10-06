import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormsComponent } from './forms/forms.component';
import { NewFormComponent } from './new-form/new-form.component';

const routes: Routes = [
  { path: '', component: NewFormComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'form', component: FormDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
