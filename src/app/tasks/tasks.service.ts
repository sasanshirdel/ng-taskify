import { Injectable } from '@angular/core';
import type { Status, Task } from './model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];

  constructor() {
    const loadedTasks = window.localStorage.getItem("tasks");

    if (loadedTasks) {
      this.tasks = JSON.parse(loadedTasks)
    }

  }


  get allTasks() {
    return this.tasks;
  }

  addTask(title: string, des: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      des,
      status: "OPEN"
    };
    this.tasks.unshift(task);
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  filterAllTasks(status: Status | "ALL") {
    if (status === "ALL") {
      return this.tasks
    } else {
      return this.tasks.filter(task => task.status === status);
    }
  }

  changeTaskStatus(id: string, newStatus: Status) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
