import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  customer: Customer = { id: '', name: '', address: '', phone: '' };

  constructor(private http: HttpClient) {}

  registerCustomer(): void {
    // Realizar una solicitud POST al endpoint del backend para registrar el cliente
    this.http.post('http://localhost:3000/api/customers', this.customer).subscribe(() => {
      console.log('Cliente registrado en el servidor');
      // Limpiar el formulario después del registro exitoso
      this.customer = { id: '', name: '', address: '', phone: '' };
    }, error => {
      console.error('Error al registrar el cliente:', error);
    });
  }
}
