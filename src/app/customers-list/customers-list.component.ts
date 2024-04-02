import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Customer {
  id: number; // Agrega el campo 'id' para identificar cada tarea de manera única
  code: string
  name: string;
  address: string;
  phone: number;
}

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {
  customerCodes: Customer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCustomerCodes();
  }

  getCustomerCodes(): void {
    this.http.get<Customer[]>('http://localhost:3000/api/clientes/codigos').subscribe(data => {
      this.customerCodes = data;
    });
  }
}
