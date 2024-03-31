import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component'

/* const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'register', component: CustomerRegisterComponent }  
]; */

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'customer-register', component: CustomerRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
