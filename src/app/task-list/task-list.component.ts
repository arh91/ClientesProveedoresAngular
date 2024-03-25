import { Component } from '@angular/core';

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

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newItem: TaskItem = {
        id: this.taskItems.length + 1,
        task: this.newTask,
        completed: false
      };
      this.taskItems.push(newItem);
      this.newTask = ''; // Limpiar el campo de entrada después de agregar la tarea
    }
  }

  completeTask(item: TaskItem): void {
    item.completed = true;
  }

  removeTask(item: TaskItem): void {
    this.taskItems = this.taskItems.filter((task) => task.id !== item.id);
  }
}
