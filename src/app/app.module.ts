import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { AppStartComponent } from './app-start/app-start.component';
import { CustomerOptionsComponent } from './customer-options/customer-options.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { SupplierOptionsComponent } from './supplier-options/supplier-options.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AppStartComponent,
    CustomerRegisterComponent,
    AppStartComponent,
    CustomerOptionsComponent,
    CustomersListComponent,
    SupplierRegisterComponent,
    SupplierOptionsComponent, 
    SuppliersListComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
