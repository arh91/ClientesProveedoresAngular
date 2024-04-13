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
  oldSupplierName = "";
  oldSupplierAddress = "";
  oldSupplierPhone = "";

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
      this.oldSupplierName = this.supplier.nombre;
      this.oldSupplierAddress = this.supplier.direccion;
      this.oldSupplierPhone = this.supplier.telefono;
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
    let newSupplierName = this.supplier?.nombre;
    let newSupplierAddress = this.supplier?.direccion;
    let newSupplierPhone = this.supplier?.telefono;

    // Verificamos que no quede ningún campo vacío
    if (!this.supplier?.nombre || !this.supplier?.direccion || !this.supplier?.telefono) {
      //this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      alert("Por favor, rellene todos los campos");
      return; 
    }
    if(this.oldSupplierName==newSupplierName && this.oldSupplierAddress==newSupplierAddress && this.oldSupplierPhone==newSupplierPhone){
      //this.openSnackBar('Aviso', 'No se ha modificado ningún dato.');
      alert("No se ha modificado ningún dato");
      return;
    }
    //Verificamos que el nombre introducido no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.supplier.nombre)){
      alert("El nombre introducido no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que la dirección introducida no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.supplier.direccion)){
      alert("La dirección introducida no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que el formato de número de teléfono sea correcto
    if(!this.validarTelefono(this.supplier.telefono)){
      alert("Por favor, introduzca un número de teléfono válido");
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


  comprobarLongitudCadena(cadena: string): boolean {
    if (cadena.length > 50) {
      return true; 
    } else {
      return false; 
    }
  }


  validarTelefono(cadena: string): boolean {
    // Expresión regular para verificar que la cadena contenga exactamente 9 dígitos
    const regex = /^\d{9}$/;
    
    // Comprobamos si la cadena coincide con la expresión regular
    if (regex.test(cadena)) {
      return true; // La cadena contiene 9 números
    } else {
      return false; // La cadena no cumple con el formato deseado
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }
}
