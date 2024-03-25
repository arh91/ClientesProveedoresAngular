import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component'; // Importa el componente


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-list-app';
}
