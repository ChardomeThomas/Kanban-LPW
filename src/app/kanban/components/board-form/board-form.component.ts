
import { Component, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IBoardDto } from '../../../core/models/board.model';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { UrlValidator } from '../../../shared/helper/url-validators.helper';
import { BoardsService } from '../../services/boards.service';
import { AuthService } from './../../../auth/services/auth.service';
@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],

standalone: true,
})
export class BoardFormComponent {
  @Output() onRegister = new EventEmitter<IBoardDto>();
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BoardFormComponent>,
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required, UrlValidator.isUrlValid("url")]]
    });
  }

  async registerBoard(type: 'cancel' | 'valid') {
    if (type === 'cancel') {
      this.dialogRef.close();
    } else if (this.form.valid) {
      try {
        const nextId = await this.boardsService.getNextId();
        const boardDto: IBoardDto = {
          id: nextId,
          title: this.form.controls['title'].value,
          description: this.form.controls['description'].value,
          url: this.form.controls['url'].value,
          email: this.authService.getCurrentUserEmail()
        };
        this.onRegister.emit(boardDto);
        // this.boardsService.saveBoard(boardDto);
        this.dialogRef.close();
      } catch (error) {
        console.error('Error registering board:', error);
      }
    }
  }
}