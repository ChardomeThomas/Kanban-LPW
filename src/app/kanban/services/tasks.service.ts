import { Injectable } from '@angular/core';
import { ITaskDto } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly TASKS_DB_KEY = 'tasks';

  constructor() {}

  saveTask(task: ITaskDto, idBoard: string) {
    let tasks = this.loadTasks();
    if (!Array.isArray(tasks)) {
      tasks = []; // Si les tâches ne sont pas un tableau valide, initialiser comme un tableau vide
    }
    task.idTask = this.getNextTaskId(tasks); // Utiliser la fonction pour obtenir le prochain identifiant de tâche
    task.idBoard = idBoard; // Utiliser l'ID du tableau passé depuis le composant
    tasks.push(task);
    this.saveTasksToLocalStorage(tasks); // Appeler la méthode pour sauvegarder la liste complète des tâches
  }

  private saveTasksToLocalStorage(tasks: ITaskDto[]) {
    localStorage.setItem(this.TASKS_DB_KEY, JSON.stringify(tasks));
  }

  loadTasks(): ITaskDto[] {
    const tasksJson = localStorage.getItem(this.TASKS_DB_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  getTasksByStatus(status: string, idBoard: string): ITaskDto[] {
    const allTasks = this.loadTasks();
    return allTasks.filter(task => task.status === status && task.idBoard === idBoard);
  }

  private getNextTaskId(tasks: ITaskDto[]): number {
    if (tasks.length === 0) {
      return 1; // Si aucune tâche existante, retourne 1 comme prochain ID
    } else {
      const maxId = Math.max(...tasks.map(task => task.idTask));
      return maxId + 1; // Retourne le prochain ID en ajoutant 1 au maximum des IDs existants
    }
  }

  updateTaskStatus(updatedTask: ITaskDto) {
    let tasks = this.loadTasks();
    tasks = tasks.map(task => {
      if (task.idBoard === updatedTask.idBoard && task.idTask === updatedTask.idTask) { // Identifier la tâche à mettre à jour par son ID
        return updatedTask; // Remplacer la tâche existante par la tâche mise à jour
      } else {
        return task; // Retourner la tâche inchangée si ce n'est pas celle à mettre à jour
      }
    });
    this.saveTasksToLocalStorage(tasks); // Sauvegarder la liste mise à jour dans le stockage local
  }
}
