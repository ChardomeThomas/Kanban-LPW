import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly TASKS_DB_KEY = 'tasks';

  constructor() {}

  saveTasks(tasks: any[]) {
    localStorage.setItem(this.TASKS_DB_KEY, JSON.stringify(tasks));
  }

  loadTasks(): any[] {
    const tasksJson = localStorage.getItem(this.TASKS_DB_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
}
