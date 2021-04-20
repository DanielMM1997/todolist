import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksCollection: AngularFirestoreCollection<Task>;
  prueba: Observable<Task[]>;
  lista: Task[];

  tasks!: AngularFireList<any>;
  todoList!: Task[];
  // selectedTask: Task = new Task();

  prueba2: Observable<Task[]>;
  tasksCollection2: AngularFirestoreCollection<Task>;
  tasks2: AngularFireList<Task>;

  
  constructor(private fb: AngularFireDatabase, public db: AngularFirestore) {
    this.tasks2 = fb.list('tasks');
    // this.tasks2
    // this.tasksCollection2 = db.collection<Task>('tasks');
    // this.prueba2 = this.tasksCollection2.valueChanges();
    // this.tasksCollection = this.db.collection('tasks');
    // this.prueba = this.tasksCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => a.payload.doc.data() as Task))
    // );
    // this.prueba = this.tasksCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //     const data = a.payload.doc.data() as Task
    //     data.key = a.payload.doc.id;
    //     return data;
    //     })
    //   })
    // );
    this.prueba2 = this.tasks2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.val()
          data.key = a.payload.key
          // this.todoList.push(data as Task);
          return data;
        })
      })
    );
  }
  
  getTasks() {
    this.tasks = this.fb.list('tasks');
    this.tasks.snapshotChanges().subscribe(
      item => {
        this.todoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          // console.log(x)
          // x["$id"] = element.key;
          this.todoList.push(x as Task);
        })
      }
    );
    // this.prueba.forEach(a => {
    //   console.log(a)
    //   this.lista = a;
    // })
    // console.log(this.prueba2)
    return this.prueba2
    // this.prueba.subscribe(
    //   item => {
    //     this.lista = [];
    //     item.forEach(element => {
    //       // console.log(x)
    //       // x["$id"] = element.key;
    //       this.lista.push(element as Task);
    //     })
    //   }
    // );
    // console.log(this.lista)
    // return this.lista;
  }

  getTask(key: string) {

  }

  insertTask(task: Task) {
    // this.tasks.push({
    //   label: task.label,
    //   done: task.done,
    //   priority: task.priority
    // })
    task.created_at = new Date().toLocaleDateString();
    // console.log(new Date().toLocaleDateString())
    // console.log(new Date().toLocaleString())
    // console.log(new Date().toLocaleTimeString())
    // console.log(new Date().toString())
    // console.log(new Date().toISOString())
    // console.log(new Date().toUTCString())
    this.tasks2.push(task);
  }

  updateTask(task: Task) {
    // this.tasks.push({
    //   label: task.label,
    //   done: task.done,
    //   priority: task.priority
    // })
    this.tasks2.update(task.key, task)
  }

  deleteTask(key: string) {
    this.tasks2.remove(key);
  }

  onEditTask(task: Task) {

  }

  onDeleteTask(task: Task) {

  }
}
