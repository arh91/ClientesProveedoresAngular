import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStartComponent } from './app-start/app-start.component';
import { CustomerOptionsComponent } from './customer-options/customer-options.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { SupplierOptionsComponent } from './supplier-options/supplier-options.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

/* const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'register', component: CustomerRegisterComponent }  
]; */

const routes: Routes = [
  { path: '', component: AppStartComponent },
  { path: 'customer-options', component: CustomerOptionsComponent },
  { path: 'customer-register', component: CustomerRegisterComponent },
  { path: 'customers-list', component: CustomersListComponent },
  { path: 'supplier-options', component: SupplierOptionsComponent },
  { path: 'supplier-register', component: SupplierRegisterComponent },
  { path: 'suppliers-list', component: SuppliersListComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'supplier-details', component: SupplierDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
