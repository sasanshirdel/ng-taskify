import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  private tasksService = inject(TasksService)

  enterdTitle = signal("");
  enteredDes = signal("");


  onSubmit(form: HTMLFormElement) {
    if (!this.enterdTitle() || !this.enteredDes()) {
      return;
    }
    this.tasksService.addTask(this.enterdTitle(), this.enteredDes())
    form.reset()
  }
}
