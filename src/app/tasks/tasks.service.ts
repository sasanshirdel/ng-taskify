import { Injectable, signal } from '@angular/core';
import type { Status, Task } from './model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  constructor() {
    const loadedTasks = window.localStorage.getItem("tasks");
    if (loadedTasks) {
      try {
        this.tasks.set(JSON.parse(loadedTasks));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
        this.tasks.set([]);
      }
    }
  }

  private saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks()));
  }

  addTask(title: string, des: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      des,
      status: "OPEN"
    };

    this.tasks.update(tasks => [task, ...tasks]);
    this.saveTasks();
  }

  filterAllTasks(status: Status | "ALL"): Task[] {
    if (status === "ALL") {
      return this.tasks();
    } else {
      return this.tasks().filter(task => task.status === status);
    }
  }

  changeTaskStatus(id: string, newStatus: Status) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasks();
  }

  updateTask(updatedTask: Task) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id ? { ...updatedTask } : task
      )
    );
    this.saveTasks();
  }
}
