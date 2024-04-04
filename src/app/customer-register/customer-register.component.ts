import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Customer {
  dni: string;
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
  customer: Customer = { dni: '', name: '', address: '', phone: '' };

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  registerCustomer(): void {
    // Verificamos que no quede ningún campo vacío
    if (!this.customer.dni || !this.customer.name || !this.customer.address || !this.customer.phone) {
      this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      return; 
    }
    // Realizamos una solicitud POST al endpoint del backend para registrar el cliente
    this.http.post('http://localhost:3000/api/clientes', this.customer).subscribe(() => {
      console.log('Cliente registrado en el servidor');
      // Limpiar el formulario después del registro exitoso
      this.customer = { dni: '', name: '', address: '', phone: '' };
      this.openSnackBar('Aviso', 'Cliente registrado');
    }, error => {
      console.error('Error al registrar el cliente:', error);
      this.openSnackBar('Aviso', 'No se ha podido registrar el cliente');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'bottom', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }
  
}
