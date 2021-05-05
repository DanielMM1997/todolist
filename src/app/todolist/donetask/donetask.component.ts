import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-donetask',
  templateUrl: './donetask.component.html',
  styleUrls: ['./donetask.component.scss']
})
export class DonetaskComponent implements OnInit {
  title = 'Done Task';
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getDoneTask().subscribe(task => this.tasks = task)
  } 

  deletePermanently(task: string) {
    this.taskService.deleteDoneTask(task)
  }

  restoreTask(task: Task) {
    this.taskService.insertTask(task);
    this.taskService.deleteDoneTask(task.key);
  }
}
