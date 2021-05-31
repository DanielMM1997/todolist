import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
import { TodolistComponent } from "../todolist/todolist.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  Table : TodolistComponent;
  constructor(private modalService: NgbModal, private taskService: TaskService) { 
    this.Table = new TodolistComponent(modalService,  taskService)
  }

  ngOnInit(): void {
  }

  loadStarted() {
    this.Table.loadStartedTasks();
  }
}
