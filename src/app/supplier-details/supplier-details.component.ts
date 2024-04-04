// En supplier-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Supplier {
  id: number;
  dni: string;
  nombre: string;
  direccion: string;
  telefono: string;
}

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  supplierId: number = 0;
  supplier: Supplier | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.supplierId = Number(params.get('id')); // Obtenemos el ID de la URL
      this.getSupplierDetails(this.supplierId); // Obtenemos detalles del proveedor
    });
  }

  getSupplierDetails(id: number): void {
    this.http.get<Supplier>(`http://localhost:3000/api/proveedores/${id}`).subscribe(data => {
      this.supplier = data; // Almacenamos detalles del proveedor
    }, error => {
      console.error('Error al obtener detalles del proveedor:', error);
    });
  }

  deleteSupplier(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      return;
    }
    this.http.delete(`http://localhost:3000/api/proveedores/${this.supplier?.id}`).subscribe(() => {
      console.log('Proveedor eliminado');
      this.openSnackBar('Proveedor eliminado correctamente', 'Cerrar');
      this.router.navigate(['/suppliers-list']); // Redirigimos a la lista de proveedores después de eliminar
    }, error => {
      console.error('Error al eliminar proveedor:', error);
      this.openSnackBar('Error al eliminar proveedor', 'Cerrar');
    });
  }

  updateSupplier(): void {
    // Verificamos que no quede ningún campo vacío
    if (!this.supplier?.dni || !this.supplier?.nombre || !this.supplier?.direccion || !this.supplier?.telefono) {
      this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      return; 
    }
    if (!confirm('¿Estás seguro de que deseas modificar este proveedor?')) {
      return;
    }
    this.http.put(`http://localhost:3000/api/proveedores/${this.supplierId}`, this.supplier).subscribe(() => {
      console.log('Proveedor actualizado en el servidor');
      this.openSnackBar('Proveedor actualizado', 'Cerrar');
    }, error => {
      console.error('Error al actualizar el proveedor:', error);
      this.openSnackBar('Error al actualizar el proveedor', 'Cerrar');
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
