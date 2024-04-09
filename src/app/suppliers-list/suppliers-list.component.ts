import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse  } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Supplier {
  id: number; 
  code: string
  name: string;
  address: string;
  phone: string;
}


@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css'
})
export class SuppliersListComponent implements OnInit{
  dniInput: string = '';
  supplierIds: Supplier[] = [];
  supplier: Supplier | undefined;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.getSupplierCodes();
  }


  getSupplierCodes(): void {
    this.http.get<any>('http://localhost:3000/api/proveedores/codigos').subscribe(data => {
      if (data && data.codigos && Array.isArray(data.codigos)) {
        this.supplierIds = data.codigos;
      }
      if (this.supplierIds.length === 0) {
        this.emptyListMessage();
      } else {
        console.error('Respuesta inválida del servidor:', data);
      }
    }, error => {
      console.error('Error al obtener códigos de proveedores:', error);
    });
  }


  okAction(): void{
    if(!this.validarDNI(this.dniInput)){
      alert("Por favor, introduzca un dni válido");
      return;
    }
    const suppliersList = document.getElementById("suppliersList");
    const supplierFound = document.getElementById("supplierFound");
    if (suppliersList && supplierFound) {
      suppliersList.style.visibility = "none";
      supplierFound.style.visibility = "visible"; // Mostrar elementos
    }
    this.getSupplierCodeByDni(this.dniInput);
  }

  getSupplierCodeByDni(dni: string): void {
    // Verificamos que no quede ningún campo vacío
    if (!dni) {
      this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      return; 
    }
    console.log(dni);
    this.supplierIds = [];
    this.http.get<any>(`http://localhost:3000/api/proveedores/codigos/${dni}`).subscribe(data => {
      const supplierId = data.id;
      if (supplierId) {
        this.supplierIds.push(supplierId);
        console.log(supplierId);
      } else {
        this.supplierNotFoundMessage();
      }
    }, error => {
      console.error('Error al obtener códigos de proveedores:', error);
      this.supplierNotFoundMessage();
    });
  }

  deleteAllSuppliers(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar todos los proveedores de la base de datos?')) {
      return;
    }
    const req = new HttpRequest('DELETE', 'http://localhost:3000/api/proveedores', {
      reportProgress: true, // Opcional: para recibir información sobre el progreso de la eliminación
    });
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<any>;
        console.log('Respuesta del servidor:', response.body);
        this.openSnackBar('Todos los proveedores han sido eliminados', 'Cerrar');
        this.getSupplierCodes(); // Actualizamos la lista de proveedores después de eliminar
      }
    }, error => {
      console.error('Error al eliminar proveedores:', error);
      this.openSnackBar('Error al eliminar proveedores', 'Cerrar');
    });
  }

  showSupplierSearch() {
    const supplierSearch = document.getElementById("findByDni");
    if (supplierSearch) {
      supplierSearch.style.visibility = "visible"; // Mostrar elementos
    }
  }

  backToMainList(): void {
    const supplierSearch = document.getElementById("findByDni");
    if (supplierSearch) {
      supplierSearch.style.visibility = "hidden"; // Mostrar elementos
    }
    this.getSupplierCodes();
  }

  validarDNI(dni: string): boolean {
    // Patrón para validar DNI: 8 dígitos seguidos de una letra (mayúscula o minúscula)
    const dniPattern = /^\d{8}[a-zA-Z]$/;
  
    // Comprobamos si el DNI coincide con el patrón
    if (dniPattern.test(dni)) {
      // Extraer los dígitos y la letra del DNI
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

  emptyListMessage(): void {
    this._snackBar.open('No hay proveedores registrados.', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }

  supplierNotFoundMessage(): void {
    this._snackBar.open('No se ha encontrado ningún proveedor con éste dni.', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
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
