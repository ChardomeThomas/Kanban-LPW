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
  selectedColor: string = 'white'; // Ajout de la variable selectedColor
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

    console.log('ID du tableau:', this.data.idBoard); // Afficher l'identifiant du tableau dans la console
  }
  getColorForTag(tag: string): string { // Modification de l'argument en 'tag' au lieu de 'index'
    const index = this.tags.indexOf(tag);
    return this.color[index];
  }
  onTagSelectionChange(event: MatSelectChange): void {
    const selectedIndex = event.value; // Index sélectionné dans la liste déroulante
    const selectedTag = this.tags[selectedIndex]; // Récupérer le tag correspondant à l'index sélectionné
    this.selectedColor = this.getColorForTag(selectedTag); // Stockage de la couleur correspondant au tag sélectionné
}
  saveTask() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        color: this.selectedColor, // Utilisation de selectedColor dans taskData
        status: 'todo' 
      };
      console.log(taskData);
      this.tasksService.saveTask(taskData, this.data.idBoard);
      this.taskCreated.emit(); // Émettre un événement pour indiquer la création d'une nouvelle tâche
      this.dialogRef.close();
    }
  }
}
