import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Customer {
  dni: string;
  nombre: string;
  direccion: string;
  telefono: string;
}

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  customer: Customer = { dni: '', nombre: '', direccion: '', telefono: '' };

  constructor(private http: HttpClient) {}

  registerCustomer(): void {
    // Realizar una solicitud POST al endpoint del backend para registrar el cliente
    this.http.post('http://localhost:3000/api/customers', this.customer).subscribe(() => {
      console.log('Cliente registrado en el servidor');
      // Limpiar el formulario después del registro exitoso
      this.customer = { dni: '', nombre: '', direccion: '', telefono: '' };
    }, error => {
      console.error('Error al registrar el cliente:', error);
    });
  }
}
