import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { TasksService } from './tasks.service';
import { FormsModule } from '@angular/forms';
import { Status } from './model/tasks.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  private tasksService = inject(TasksService);

  listFilterStatus = signal<Status | "ALL">("ALL")

  tasks = computed(() =>
    this.tasksService.filterAllTasks(this.listFilterStatus())
  );

}
