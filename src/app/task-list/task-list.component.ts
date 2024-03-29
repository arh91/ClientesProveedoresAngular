import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TaskItem {
  id: number; // Agrega el campo 'id' para identificar cada tarea de manera única
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

  getTaskItems(): void {
    this.http.get<TaskItem[]>('http://localhost:3000/api/tasks').subscribe(data => {
      this.taskItems = data;
    });
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newItem: TaskItem = {
        id: this.taskItems.length + 1, // Genera un ID único para la nueva tarea
        task: this.newTask,
        completed: false
      };
      this.taskItems.push(newItem);
      this.saveTaskToServer(newItem);
      this.newTask = '';
    }
  }

  saveTaskToServer(task: TaskItem): void {
    this.http.post('http://localhost:3000/api/tasks', task).subscribe(() => {
      console.log('Se ha guardado la tarea');
    });
  }

  removeSelectedTasks(): void {
    const selectedTasks = this.taskItems.filter(task => task.completed); // Filtra las tareas completadas
    if (selectedTasks.length > 0) {
      // Realiza una solicitud DELETE para eliminar las tareas marcadas en el servidor
      selectedTasks.forEach(task => {
        this.http.delete(`http://localhost:3000/api/tasks/${task.id}`).subscribe(() => {
          console.log('Se ha eliminado la tarea');
        });
      });
      this.taskItems = this.taskItems.filter(task => !task.completed); // Elimina las tareas marcadas de la lista local
    }
  }

  markAsCompleted(task: TaskItem): void {
    task.completed = true;
    this.updateTaskOnServer(task);
  }

  updateTaskOnServer(task: TaskItem): void {
    this.http.put(`http://localhost:3000/api/tasks/${task.id}`, task).subscribe(() => {
      console.log('Tarea actualizada');
    });
  }
}


