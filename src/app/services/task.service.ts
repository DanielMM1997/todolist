import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksList: AngularFirestoreCollection<Task>;
  doneTasksList: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  
  constructor(private fs: AngularFirestore) {
    this.tasksList = fs.collection('tasks');
    this.doneTasksList = fs.collection('donetasks');
  }
  
  getTasks() {
    this.tasks = this.tasksList.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.key = a.payload.doc.id;
        return data;
      }))
    );
    return this.tasks
  }

  getDoneTask() {
    this.tasks = this.doneTasksList.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.key = a.payload.doc.id;
        return data;
      }))
    );
    return this.tasks;
  }

  getStartedTasks() {
    return this.fs.collection<Task>('tasks', ref => ref.where('state', '==', 'Started')).valueChanges();
  }

  getTask(key: string) {

  }

  insertTask(task: Task) {
    var aux = {
      key: this.fs.createId(),
      name: task.name, 
      priority: task.priority,
      state: task.state, 
      created_at: new Date().toLocaleDateString()
    }
    this.tasksList.add(aux);
  }

  insertDoneTask(task: Task) {
    var aux = {
      name: task.name, 
      priority: task.priority,
      state: task.state, 
      created_at: new Date().toLocaleDateString()
    }
    console.log(task);
    
    this.doneTasksList.add(task);
  }

  updateTask(task: Task) {
    this.tasksList.ref.doc(task.key).update(task)
  }

  deleteTask(key: string) {
    this.tasksList.doc(key).delete()
  }

  deleteDoneTask(key: string) {
    this.doneTasksList.doc(key).delete()
  }
}
