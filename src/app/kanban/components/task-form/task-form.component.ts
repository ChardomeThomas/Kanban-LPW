import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatDialogModule, MatOption, MatSelectModule, MatIconModule, MatButtonModule]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  @Input() idBoard: string | null = null;
  @Output() taskCreated: EventEmitter<void> = new EventEmitter<void>();
  tags: string[] = ['Urgent', 'Didier', 'Ludo', 'Front', 'Back'];
  color: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  selectedColor: string = 'white'; 
  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idBoard: string }

  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({ 
      name: ['', Validators.required],
      description: [''],
      tag: ['']
    });

    console.log('ID du tableau:', this.data.idBoard); 
  }
  getColorForTag(tag: string): string { 
    const index = this.tags.indexOf(tag);
    return this.color[index];
  }
  onTagSelectionChange(event: MatSelectChange): void {
    const selectedIndex = event.value; 
    const selectedTag = this.tags[selectedIndex]; 
    this.selectedColor = this.getColorForTag(selectedTag); 
}
  saveTask() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        color: this.selectedColor, 
        status: 'todo' 
      };
      console.log(taskData);
      this.tasksService.saveTask(taskData, this.data.idBoard);
      this.taskCreated.emit(); 
      this.dialogRef.close();
    }
  }
}
