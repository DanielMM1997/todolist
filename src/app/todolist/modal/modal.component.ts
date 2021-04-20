import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

import {NgForm} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from "../../models/task";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  task: Task;
  editingTask: Task;
  editing = false;
  todoList!: Task[];
  lista: Task[];
  tasks$ = this.taskService.prueba;
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
  // angular/angularfire2
  constructor(private modalService: NgbModal, private taskService: TaskService) {
  }

  ngOnInit(): void {
    // this.taskService.todoList;
    console.log(this.taskService.getTasks())
    this.taskService.getTasks().forEach(
      a => {
        console.log(a);
        this.lista = a;
      }
    )
    // console.log("----------------")
    // console.log(this.taskService.todoList)
    //   .getTasks()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.todoList = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       // console.log(x)
    //       // x["$id"] = element.key;
    //       this.todoList.push(x as Task);
    //     })
    //   }
    // );
  }

  addTask(newLabel: any, newPriority: any){
    var newTask = {
      label: newLabel,
      priority: newPriority,
      done: false
    }
    this.todo.push(newTask);
    this.taskService.insertTask(this.task)
    this.task = new Task();
    this.editing = true;
    this.modalService.dismissAll();
  }

  newTask() {
      this.editing = false;
      this.task = new Task();
  }

  deleteTask(task: string) {
    this.taskService.deleteTask(task)
    // this.todo = this.todo.filter(item => item.label !== task.label)
  }

  editTask(newLabel: any, newPriority: any){
    this.taskService.updateTask(this.task)
    this.modalService.dismissAll();
  }

  submit(data: any) {
    console.log(data)
  }

  open(content: any) {
    this.modalService.open(content);
    this.editing = false;
    this.task = new Task();
  }

  edit(content: any, task: Task) {
    console.log(task);
    this.editing = true;
    this.task = task;
    this.modalService.open(content);
  }
}
