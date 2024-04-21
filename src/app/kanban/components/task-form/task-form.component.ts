import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatDialogModule]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  @Input() idBoard: string | null = null;
  @Output() taskCreated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idBoard: string }

  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({ 
      name: ['', Validators.required],
      description: ['']
    });

    console.log('ID du tableau:', this.data.idBoard); // Afficher l'identifiant du tableau dans la console
  }

  saveTask() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        status: 'todo' 
      };
  
      this.tasksService.saveTask(taskData, this.data.idBoard);
      this.taskCreated.emit(); // Émettre un événement pour indiquer la création d'une nouvelle tâche
      this.dialogRef.close();
    }
  }
}