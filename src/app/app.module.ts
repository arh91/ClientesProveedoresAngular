import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { AppStartComponent } from './app-start/app-start.component';
import { CustomerOptionsComponent } from './customer-options/customer-options.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { SupplierOptionsComponent } from './supplier-options/supplier-options.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    AppStartComponent,
    CustomerRegisterComponent,
    AppStartComponent,
    CustomerOptionsComponent,
    CustomersListComponent,
    SupplierRegisterComponent,
    SupplierOptionsComponent, 
    SuppliersListComponent,
    CustomerDetailsComponent, 
    SupplierDetailsComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
