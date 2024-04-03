import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse  } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Customer {
  id: number; 
  code: string
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
  customerIds: Customer[] = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.getCustomerCodes();
  }


  getCustomerCodes(): void {
    this.http.get<any>('http://localhost:3000/api/clientes/codigos').subscribe(data => {
      if (data && data.codigos && Array.isArray(data.codigos)) {
        this.customerIds = data.codigos;
      } else {
        console.error('Respuesta inválida del servidor:', data);
      }
    }, error => {
      console.error('Error al obtener códigos de clientes:', error);
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical
      horizontalPosition: 'center', // Posición horizontal
    });
  }
}

