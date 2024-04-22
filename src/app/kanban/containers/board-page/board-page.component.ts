import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem, } from '@angular/cdk/drag-drop';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ITaskDto } from './../../../core/models/task.model';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TasksService } from '../../services/tasks.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  standalone: true,
  imports: [MatInputModule, CdkDropListGroup, CdkDropList, CdkDrag, MatIconModule, MatButtonModule, RouterModule],
})
export class BoardPageComponent implements OnInit {
  todo: ITaskDto[] = [];
  standBy: ITaskDto[] = [];
  inProgress: ITaskDto[] = [];
  blocked: ITaskDto[] = [];
  close: ITaskDto[] = [];
  idBoard: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private tasksService: TasksService,
  ) {
    this.idBoard = '';
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 1) {
       
        this.idBoard = urlSegments[1].path;
        this.loadTasks();
        
      }
    });
  }
  deleteTask(idBoard: string, idTask: number): void {
    this.tasksService.deleteTask(idBoard, idTask);
    // Rechargez les tâches après la suppression
    this.loadTasks();
  }


  
  
  openTaskFormDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { idBoard: this.idBoard } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.loadTasks();
    });
  }

  
  loadTasks() {
    if (this.idBoard) { 
      this.todo = this.tasksService.getTasksByStatus('todo', this.idBoard);
      this.standBy = this.tasksService.getTasksByStatus('standBy', this.idBoard);
      this.inProgress = this.tasksService.getTasksByStatus('inProgress', this.idBoard);
      this.blocked = this.tasksService.getTasksByStatus('blocked', this.idBoard);
      this.close = this.tasksService.getTasksByStatus('close', this.idBoard);
      console.log(this.todo, this.standBy, this.inProgress, this.blocked, this.close);
    }
    
  }

  drop(event: CdkDragDrop<ITaskDto[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const taskToMove = event.previousContainer.data[event.previousIndex];
      taskToMove.status = status; 
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
  
      
      this.tasksService.updateTaskStatus(taskToMove);
    }
  }
  
}