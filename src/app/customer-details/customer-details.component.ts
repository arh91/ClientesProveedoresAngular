// En customer-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Customer {
  id: number;
  dni: string;
  nombre: string;
  direccion: string;
  telefono: string;
}


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number = 0;
  customer: Customer | undefined;
  oldCustomerName = "";
  oldCustomerAddress = "";
  oldCustomerPhone = "";


  constructor(private route: ActivatedRoute, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = Number(params.get('id')); // Obtener el ID de la URL
      this.getCustomerDetails(this.customerId); // Obtener detalles del cliente
    });
  }


  getCustomerDetails(id: number): void {
    this.http.get<Customer>(`http://localhost:3000/api/clientes/${id}`).subscribe(data => {
      this.customer = data; // Almacenar detalles del cliente
      this.oldCustomerName = this.customer.nombre;
      this.oldCustomerAddress = this.customer.direccion;
      this.oldCustomerPhone = this.customer.telefono;
    }, error => {
      console.error('Error al obtener detalles del cliente:', error);
    });
    
  }


  deleteCustomer(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      return;
    }
    const idAEliminar = this.customer?.id ?? 0;
    this.http.delete(`http://localhost:3000/api/clientes/${idAEliminar}`).subscribe(() => {
      console.log('Cliente eliminado');
      this.openSnackBar('Cliente eliminado correctamente', 'Cerrar');
      this.updateCustomerIds(idAEliminar);
      //this.router.navigate(['/customers-list']); // Redirigir a la lista de clientes después de eliminar
    }, error => {
      console.error('Error al eliminar cliente:', error);
      this.openSnackBar('Error al eliminar cliente', 'Cerrar');
    });
  }

  updateCustomerIds(id: number): void{
    console.log("método updateCustomerIds recibe id " + id);
    this.http.put(`http://localhost:3000/api/clientes/updateids/${id}`, this.customer).subscribe(() => {
      console.log('Se han actualizado los IDs en la tabla Clientes');
      this.router.navigate(['/customers-list']); // Redirigir a la lista de clientes después de actualizar
    }, error => {
      console.error('Error al actualizar IDs:', error);
    });
  }


  updateCustomer(): void {
    let newCustomerName = this.customer?.nombre;
    let newCustomerAddress = this.customer?.direccion;
    let newCustomerPhone = this.customer?.telefono;

    // Verificamos que no quede ningún campo vacío
    if (!this.customer?.dni || !this.customer?.nombre || !this.customer?.direccion || !this.customer?.telefono) {
      //this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      alert("Por favor, rellene todos los campos");
      return; 
    }
    // Verificamos que haya modificaciones en los input
    if(this.oldCustomerName==newCustomerName && this.oldCustomerAddress==newCustomerAddress && this.oldCustomerPhone==newCustomerPhone){
      //this.openSnackBar('Aviso', 'No se ha modificado ningún dato.');
      alert("No se ha modificado ningún dato");
      return;
    }
    //Verificamos que el nombre introducido no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.customer.nombre)){
      alert("El nombre introducido no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que la dirección introducida no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.customer.direccion)){
      alert("La dirección introducida no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que el formato de número de teléfono sea correcto
    if(!this.validarTelefono(this.customer.telefono)){
      alert("Por favor, introduzca un número de teléfono válido");
      return;
    }

    if (!confirm('¿Estás seguro de que deseas modificar este cliente?')) {
      return;
    }
    this.http.put(`http://localhost:3000/api/clientes/${this.customerId}`, this.customer).subscribe(() => {
      console.log('Cliente actualizado en el servidor');
      this.openSnackBar('Cliente actualizado', 'Cerrar');
    }, error => {
      console.error('Error al actualizar el cliente:', error);
      this.openSnackBar('Error al actualizar el cliente', 'Cerrar');
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
