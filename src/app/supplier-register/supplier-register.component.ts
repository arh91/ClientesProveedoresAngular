import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrl: './supplier-register.component.css'
})
export class SupplierRegisterComponent {
  supplier: Supplier = { id: '', name: '', address: '', phone: '' };

  constructor(private http: HttpClient) {}

  registerSupplier(): void {
    // Realizar una solicitud POST al endpoint del backend para registrar el cliente
    this.http.post('http://localhost:3000/api/suppliers', this.supplier).subscribe(() => {
      console.log('Proveedor registrado en el servidor');
      // Limpiar el formulario después del registro exitoso
      this.supplier = { id: '', name: '', address: '', phone: '' };
    }, error => {
      console.error('Error al registrar el proveedor:', error);
    });
  }
}
