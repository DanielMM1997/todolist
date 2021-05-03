import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksList: AngularFireList<Task>;
  tasks: Observable<Task[]>;
  
  constructor(private fb: AngularFireDatabase, private db: AngularFirestore) {
    this.tasksList = fb.list('tasks');
  }
  
  getTasks() {
    this.tasks = this.tasksList.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.val()
          data.key = a.payload.key
          return data;
        })
      })
    );
    return this.tasks
  }

  getDoneTasks() {
    this.tasks = this.tasksList.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.val()
          data.key = a.payload.key
          return data;
        })
      })
    );
    return this.tasks
  }

  getTask(key: string) {

  }

  insertTask(task: Task) {
    task.created_at = new Date().toLocaleDateString();
    this.tasksList.push(task);
  }

  updateTask(task: Task) {
    this.tasksList.update(task.key, task)
  }

  deleteTask(key: string) {
    this.tasksList.remove(key);
  }
}
