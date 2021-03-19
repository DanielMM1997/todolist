import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  title = 'To Do Items';
  todo = [
    {
    label: 'taks1',
    priority: 3,
    done: false
  }, 
  {
    label: 'taks2',
    priority: 1,
    done: true
  },
  {
    label: 'taks3',
    priority: 2,
    done: false
  }];
  constructor() { }

  ngOnInit(): void {
  }

  addTask(newLabel: any){
    var newTask = {
      label: newLabel,
      priority: 1,
      done: false
    }
    this.todo.push(newTask);
  }

  deleteTask(task: any) {
    console.log(task.label);
    this.todo = this.todo.filter(item => item.label !== task.label)
  }

}
