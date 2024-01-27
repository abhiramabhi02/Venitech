import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'form', component:DataFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
