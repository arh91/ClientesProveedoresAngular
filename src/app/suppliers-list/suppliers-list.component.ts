import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  supplierIds: Supplier[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSupplierCodes();
  }


  getSupplierCodes(): void {
    this.http.get<any>('http://localhost:3000/api/proveedores/codigos').subscribe(data => {
      if (data && data.codigos && Array.isArray(data.codigos)) {
        this.supplierIds = data.codigos;
      } else {
        console.error('Respuesta inválida del servidor:', data);
      }
    }, error => {
      console.error('Error al obtener códigos de proveedores:', error);
    });
  }
}
