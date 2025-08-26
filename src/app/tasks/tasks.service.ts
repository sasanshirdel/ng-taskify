import { Injectable, signal } from '@angular/core';
import type { Status, Task } from './model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  // Signal اصلی برای نگهداری تسک‌ها
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly(); // Readonly برای جلوگیری از تغییر مستقیم

  constructor() {
    const loadedTasks = window.localStorage.getItem("tasks");
    if (loadedTasks) {
      try {
        this.tasks.set(JSON.parse(loadedTasks));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
        this.tasks.set([]); // مقدار پیش‌فرض خالی
      }
    }
  }

  // ذخیره‌سازی signal در localStorage
  private saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks()));
  }

  // اضافه کردن تسک جدید
  addTask(title: string, des: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      des,
      status: "OPEN"
    };

    this.tasks.update(tasks => [task, ...tasks]); // اضافه کردن به ابتدای آرایه
    this.saveTasks();
  }

  // فیلتر کردن تسک‌ها بر اساس وضعیت
  filterAllTasks(status: Status | "ALL"): Task[] {
    if (status === "ALL") {
      return this.tasks();
    } else {
      return this.tasks().filter(task => task.status === status);
    }
  }

  // تغییر وضعیت تسک
  changeTaskStatus(id: string, newStatus: Status) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    this.saveTasks();
  }

  // حذف یک تسک
  removeTask(id: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasks();
  }
}
