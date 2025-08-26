import { Component } from '@angular/core';
import { UserInputComponent } from "./user-input/user-input.component";
import { ContainerComponent } from "./container/container.component";
import { TasksComponent } from "./tasks/tasks.component";

@Component({
  selector: 'app-root',
  imports: [UserInputComponent, ContainerComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
