import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from "../models/task";

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, AfterViewInit {

  task: Task;
  editing = false;
  title = 'To Do List';

  displayedColumns: string[] = ['#', 'label', 'priority', 'state', 'created_at', 'actions'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.taskService.getTasks().subscribe(task => {this.dataSource.data = task})
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

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg'});
    this.editing = false;
    this.task = new Task();
    this.task.priority = "Low"
    this.task.state = "Pending"
  }

  openModalEdit(content: any, task: Task) {
    this.editing = true;
    this.task = task;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  addTask(){
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
  }

  editTask(){
    this.taskService.updateTask(this.task)
    this.modalService.dismissAll();
  }

  submit(data: any) {
    console.log(data)
  }
}
