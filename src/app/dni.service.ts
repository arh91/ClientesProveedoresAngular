import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExistsInCustomers {
  exists: boolean;
}

export interface ExistsInSuppliers {
  exists: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class DniService {
  constructor(private http: HttpClient) {}

  checkDniInCustomers(dni: string): Observable<ExistsInCustomers> {
    console.log("dni service customers");
    return this.http.get<ExistsInCustomers>(`http://localhost:3000/api/clientes/existe/${dni}`);
  }

  // Método para verificar si el DNI existe en la tabla de Proveedores
  checkDniInSuppliers(dni: string): Observable<ExistsInSuppliers> {
    console.log("dni service suppliers");
    return this.http.get<ExistsInSuppliers>(`http://localhost:3000/api/proveedores/existe/${dni}`);
  }
}
