import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Supplier {
  dni: string;
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
  supplier: Supplier = { dni: '', name: '', address: '', phone: '' };

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  registerSupplier(): void {
    // Verificamos que los campos obligatorios no estén vacíos
    if (!this.supplier.dni || !this.supplier.name || !this.supplier.address || !this.supplier.phone) {
      this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      return; 
    }
    // Realizamos una solicitud POST al endpoint del backend para registrar el cliente
    this.http.post('http://localhost:3000/api/suppliers', this.supplier).subscribe(() => {
      console.log('Proveedor registrado en el servidor');
      // Limpiar el formulario después del registro exitoso
      this.supplier = { dni: '', name: '', address: '', phone: '' };
    }, error => {
      console.error('Error al registrar el proveedor:', error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }
}
