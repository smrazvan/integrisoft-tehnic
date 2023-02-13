import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: EditFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
