// En customer-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = Number(params.get('id')); // Obtener el ID de la URL
      this.getCustomerDetails(this.customerId); // Obtener detalles del cliente
    });
  }

  getCustomerDetails(id: number): void {
    this.http.get<Customer>(`http://localhost:3000/api/clientes/${id}`).subscribe(data => {
      this.customer = data; // Almacenar detalles del cliente
    }, error => {
      console.error('Error al obtener detalles del cliente:', error);
    });
  }
}
