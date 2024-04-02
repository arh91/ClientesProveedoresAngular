import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
}

