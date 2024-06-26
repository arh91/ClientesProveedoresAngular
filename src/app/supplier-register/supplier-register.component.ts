import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DniService } from '../dni.service';
import { ExistsInCustomers } from '../dni.service';
import { ExistsInSuppliers } from '../dni.service';

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
  //dniExists: boolean = false;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private dniService: DniService) {}

  registerSupplier(): void {
    // Verificamos que los campos obligatorios no estén vacíos
    if (!this.supplier.dni || !this.supplier.name || !this.supplier.address || !this.supplier.phone) {
      alert("Por favor, rellene todos los campos.");
      return; 
    }
    //Verificamos que el dni introducido sea correcto
    if(!this.validarDNI(this.supplier.dni)){
      alert("Por favor, introduzca un dni válido");
      return;
    }
    //Verificamos que el nombre introducido no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.supplier.name)){
      alert("El nombre introducido no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que la dirección introducida no tenga más de 50 caracteres
    if(this.comprobarLongitudCadena(this.supplier.address)){
      alert("La dirección introducida no debe contener más de 50 caracteres");
      return;
    }
    //Verificamos que el formato de número de teléfono sea correcto
    if(!this.validarTelefono(this.supplier.phone)){
      alert("Por favor, introduzca un número de teléfono válido");
      return;
    }
    //Verificamos si el dni introducido ya existe en la base de datos y en caso contrario registramos el proveedor
    this.comprobarDniYRegistrar(this.supplier.dni);
    /*console.log("dniExists vale "+this.dniExists);
    if (this.dniExists){
      this.dniExists = false;
      alert('El dni introducido ya existe en la base de datos.');
      return;
    }*/
  }


  validarDNI(dni: string): boolean {
    // Patrón para validar DNI: 8 dígitos seguidos de una letra (mayúscula o minúscula)
    const dniPattern = /^\d{8}[A-Z]$/;
  
    // Comprobar si el DNI coincide con el patrón
    if (dniPattern.test(dni)) {
      // Extraemos los dígitos y la letra del DNI
      const numerosDNI = dni.slice(0, -1);
      const letraDNI = dni.slice(-1).toUpperCase();
  
      // Calculamos la letra esperada a partir de los dígitos del DNI
      const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const indiceLetra = parseInt(numerosDNI) % 23;
      const letraEsperada = letras.charAt(indiceLetra);
  
      // Comprobamos si la letra del DNI coincide con la letra esperada
      if (letraDNI === letraEsperada) {
        return true; // El formato del DNI es válido
      }
    }
    // El formato del DNI no es válido
    return false;
  }


  comprobarDniYRegistrar(dni: string): void {
    console.log("Método checkdniexistence()");
    this.dniService.checkDniInCustomers(dni).subscribe((cli: ExistsInCustomers) => {
      console.log(cli);
      if (cli.exists) {
        alert('El dni introducido ya existe en la base de datos.');
        console.log("El DNI existe en clientes");
        return;
      } else {
        console.log("El DNI no existe en clientes. Buscando en proveedores...");
          this.dniService.checkDniInSuppliers(dni).subscribe((prov: ExistsInSuppliers) => {
          console.log(prov);
          if (prov.exists) {
            alert('El dni introducido ya existe en la base de datos.');
            console.log("El DNI existe en proveedores");
            return;
          } else {
            console.log("El DNI no existe en proveedores");
            // Realizamos una solicitud POST al endpoint del backend para registrar el proveedor
            this.http.post('http://localhost:3000/api/proveedores', this.supplier).subscribe(() => {
              console.log('Proveedor registrado en el servidor');
              // Limpiar el formulario después del registro exitoso
              this.supplier = { dni: '', name: '', address: '', phone: '' };
              alert("Proveedor registrado");
            }, error => {
              console.error('Error al registrar el proveedor:', error);
              this.openSnackBar('Aviso', 'No se ha podido registrar el proveedor');
            });
          }
        });
      }
    }, (error: any) => {
      console.error('Error al verificar la existencia del DNI:', error);
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
