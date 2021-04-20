import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

import {NgForm} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, AfterViewInit {

  

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
    state: 'terminado'
  }, 
  {
    label: 'taks2',
    priority: 1,
    state: 'terminado'
  },
  {
    label: 'taks3',
    priority: 2,
    state: 'terminado'
  }];

  displayedColumns: string[] = ['#', 'label', 'priority', 'state', 'created_at', 'actions'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  // angular/angularfire2
  constructor(private modalService: NgbModal, private taskService: TaskService) {
    this.taskService.getTasks().forEach( a => {this.lista = a} )
    // console.log(this.tasks$)
    
  }

  ngOnInit(): void {
    // this.taskService.todoList;
    // console.log(this.taskService.getTasks())
    // this.taskService.getTasks().forEach( a => {this.lista = a;this.dataSource = new MatTableDataSource(this.lista)} )
    // console.log(this.lista)
    // this.dataSource = new MatTableDataSource(this.lista);
    // console.log(this.dataSource, 'asd')

    this.dataSource = new MatTableDataSource();
    this.taskService.getTasks().subscribe(task => {this.dataSource.data = task})
    
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

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTask(newLabel: any, newPriority: any){
    // var newTask = {
    //   label: newLabel,
    //   priority: newPriority,
    //   done: false
    // }
    // this.todo.push(newTask);
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
    // console.log(task);
    this.editing = true;
    this.task = task;
    this.modalService.open(content);
  }
}
