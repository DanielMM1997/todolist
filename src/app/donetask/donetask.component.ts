import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-donetask',
  templateUrl: './donetask.component.html',
  styleUrls: ['./donetask.component.scss']
})
export class DonetaskComponent implements OnInit {
  title = 'Done Task';
  tasks: Array<Task[]>;
  displayedColumns: string[] = ['#', 'label', 'priority', 'state', 'created_at'];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(task => {this.tasks.push(task);})
  }

  deletePermanently(task: string) {
    this.taskService.deleteTask(task)
  }
}
