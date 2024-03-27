import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TaskItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'task-list-app',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskItems: TaskItem[] = [];
  newTask: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTaskItems();
  }

  // Método para obtener la lista de tareas desde el servidor
  getTaskItems(): void {
    // Realizar una solicitud GET al endpoint del backend para obtener la lista de tareas
    this.http.get<TaskItem[]>('http://localhost:3000/api/tasks').subscribe(data => {
      // Asignar los datos recibidos al array de taskItems
      this.taskItems = data;
    });
  }

  // Método para agregar una nueva tarea a la lista
  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newItem: TaskItem = {
        id: this.taskItems.length + 1,
        task: this.newTask,
        completed: false
      };
      // Agregar la nueva tarea localmente en el frontend
      this.taskItems.push(newItem);
      // Llamar al método para guardar la tarea en el servidor
      this.saveTaskToServer(newItem);
      // Limpiar el campo de entrada después de agregar la tarea
      this.newTask = '';
    }
  }

  // Método para guardar una tarea en el servidor
  saveTaskToServer(task: TaskItem): void {
    // Realizar una solicitud POST al endpoint del backend para guardar la tarea
    this.http.post('http://localhost:3000/api/tasks', task).subscribe(() => {
      console.log('Tarea guardada en el servidor');
    });
  }

  // Método para eliminar tareas completadas de la lista
  removeCompletedTasks(): void {
    // Filtrar y mantener solo las tareas no completadas
    this.taskItems = this.taskItems.filter(task => !task.completed);
    // Llamar al método para eliminar tareas completadas en el servidor
    this.deleteCompletedTasksFromServer();
  }

  // Método para eliminar tareas completadas en el servidor
  deleteCompletedTasksFromServer(): void {
    // Realizar una solicitud DELETE al endpoint del backend para eliminar tareas completadas
    this.http.delete('http://localhost:3000/api/tasks/completed').subscribe(() => {
      console.log('Tareas eliminadas del servidor');
    });
  }

  // Método para marcar una tarea como completada
  markAsCompleted(task: TaskItem): void {
    task.completed = true;
    // Llamar al método para actualizar la tarea en el servidor
    this.updateTaskOnServer(task);
  }

  // Método para actualizar una tarea en el servidor
  updateTaskOnServer(task: TaskItem): void {
    // Realizar una solicitud PUT al endpoint del backend para actualizar la tarea
    this.http.put(`http://localhost:3000/api/tasks/${task.id}`, task).subscribe(() => {
      console.log('Tarea actualizada en el servidor');
    });
  }
}
