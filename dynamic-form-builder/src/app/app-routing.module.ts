import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsListComponent } from './forms-list/forms-list.component';
import { NewFormComponent } from './new-form/new-form.component';

const routes: Routes = [
  { path: '', component: NewFormComponent },
  { path: 'forms', component: FormsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
