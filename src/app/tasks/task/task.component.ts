import { Component, inject, input } from '@angular/core';
import type { Status, Task } from '../model/tasks.model';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  private tasksService = inject(TasksService);


  task = input.required<Task>()


  updateStatus(newStatus: Status) {
    if (this.task()) {
      this.tasksService.changeTaskStatus(this.task()!.id, newStatus);
    }
  }
}
