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
  doneTasksList: AngularFireList<Task>;
  tasks: Observable<Task[]>;
  
  constructor(private fb: AngularFireDatabase, private fs: AngularFirestore) {
    this.tasksList = fb.list('tasks');
    this.doneTasksList = fb.list('donetasks');
  }
  
  getTasks() {
    this.tasks = this.tasksList.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        data.key = a.payload.key;
        return data;
      }))
    );
    return this.tasks
  }

  getDoneTask() {
    this.tasks = this.doneTasksList.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        data.key = a.payload.key;
        return data;
      }))
    );
    return this.tasks;
  }

  getDoneTask2() {
    return this.fs.collection('tasks', ref => ref.where('state', '==', 'Done')).valueChanges();
  }

  getTask(key: string) {

  }

  insertTask(task: Task) {
    task.created_at = new Date().toLocaleDateString();
    this.tasksList.push(task);
  }

  insertDoneTask(task: Task) {
    task.created_at = new Date().toLocaleDateString();
    this.doneTasksList.push(task);
  }

  updateTask(task: Task) {
    this.tasksList.update(task.key, task)
  }

  deleteTask(key: string) {
    this.tasksList.remove(key);
  }

  deleteDoneTask(key: string) {
    this.doneTasksList.remove(key);
  }
}
