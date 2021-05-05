import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonetaskComponent } from './todolist/donetask/donetask.component';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
  { path: 'done', component: DonetaskComponent}, 
  { path: '', component: TodolistComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
