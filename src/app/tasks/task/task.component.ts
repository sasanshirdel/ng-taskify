import { Component, inject, input } from '@angular/core';
import type { Status, Task } from '../model/tasks.model';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { EditTaskComponent } from "../edit-task/edit-task.component";

@Component({
  selector: 'app-task',
  imports: [FormsModule, EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  private tasksService = inject(TasksService);

  isEditing = false

  task = input.required<Task>()


  updateStatus(newStatus: Status) {
    if (this.task()) {
      this.tasksService.changeTaskStatus(this.task()!.id, newStatus);
    }
  }

  removeTask(id: string) {
    this.tasksService.removeTask(id)
  }

  editTask() {
    this.isEditing = true
  }

  closeEditModal() {
    this.isEditing = false
  }
}
