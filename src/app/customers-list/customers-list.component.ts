import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse  } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Customer {
  id: number; 
  dni: string
  name: string;
  address: string;
  phone: string;
}


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {
  dniInput: string = '';
  customerIds: Customer[] = [];
  customer: Customer | undefined;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void { 
    this.getCustomerCodes();
  }


  getCustomerCodes(): void {
    this.customerIds = [];
    this.http.get<any>('http://localhost:3000/api/clientes/codigos').subscribe(data => {
      if (data && data.codigos && Array.isArray(data.codigos)) {
        this.customerIds = data.codigos;
      }
      if (this.customerIds.length === 0) {
        this.emptyListMessage();
      } else {
        console.error('Respuesta inválida del servidor:', data);
      }
    }, error => {
      console.error('Error al obtener códigos de clientes:', error);
    });
  }

  okAction(): void{
    if(!this.validarDNI(this.dniInput)){
      alert("Por favor, introduzca un dni válido");
      return;
    }
    const customersList = document.getElementById("customersList");
    const customerFound = document.getElementById("customerFound");
    if (customersList && customerFound) {
      customersList.style.visibility = "none";
      customerFound.style.visibility = "visible"; // Mostrar elementos
    }
    this.getCustomerCodeByDni(this.dniInput);
  }

  getCustomerCodeByDni(dni: string): void {
    // Verificamos que no quede ningún campo vacío
    if (!dni) {
      this.openSnackBar('Aviso', 'Por favor, rellene todos los campos.');
      return; 
    }
    console.log(dni);
    this.customerIds = [];
    this.http.get<any>(`http://localhost:3000/api/clientes/codigos/${dni}`).subscribe(data => {
      const customerId = data.id;
      if (customerId) {
        this.customerIds.push(customerId);
        console.log(customerId);
      } else {
        this.customerNotFoundMessage();
      }
    }, error => {
      console.error('Error al obtener códigos de clientes:', error);
      this.customerNotFoundMessage();
    });
  }

  deleteAllCustomers(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar todos los clientes de la base de datos?')) {
      return;
    }
    const req = new HttpRequest('DELETE', 'http://localhost:3000/api/clientes', {
      reportProgress: true, // Opcional: para recibir información sobre el progreso de la eliminación
    });
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<any>;
        console.log('Respuesta del servidor:', response.body);
        this.openSnackBar('Todos los clientes han sido eliminados', 'Cerrar');
        this.getCustomerCodes(); // Actualizar la lista de clientes después de eliminar
      }
    }, error => {
      console.error('Error al eliminar clientes:', error);
      this.openSnackBar('Error al eliminar clientes', 'Cerrar');
    });
  }

  showCustomerSearch() {
    const customerSearch = document.getElementById("findByDni");
    if (customerSearch) {
      customerSearch.style.visibility = "visible"; // Mostrar elementos
    }
  }

  backToMainList(): void {
    const customerSearch = document.getElementById("findByDni");
    if (customerSearch) {
      customerSearch.style.visibility = "hidden"; // Mostrar elementos
    }
    this.getCustomerCodes();
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
    this._snackBar.open('No hay clientes registrados.', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }

  customerNotFoundMessage(): void {
    this._snackBar.open('No se ha encontrado ningún cliente con éste dni.', 'Cerrar', {
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

