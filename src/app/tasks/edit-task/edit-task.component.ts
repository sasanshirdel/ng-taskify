import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Task } from '../model/tasks.model';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  private tasksService = inject(TasksService)

  close = output<void>();
  task = input.required<Task>();

  newTitle = signal<string>("");
  newDes = signal<string>("");

  ngOnInit() {
    // وقتی فرم باز شد مقادیر فعلی تسک رو ست کن
    this.newTitle.set(this.task().title);
    this.newDes.set(this.task().des);
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    const updatedTask: Task = {
      ...this.task(),
      title: this.newTitle(),
      des: this.newDes()
    };

    this.tasksService.updateTask(updatedTask);
    this.closeModal();
  }
}
