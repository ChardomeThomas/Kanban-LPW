// import { Component, EventEmitter, Output } from "@angular/core";
// import { MatInputModule } from "@angular/material/input";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import {
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from "@angular/forms";
// import { MatCardModule } from "@angular/material/card";
// import { IBoardDto } from "../../../core/models/board.model";
// import { AuthService } from "../../../auth/services/auth.service";
// import { Router } from "@angular/router";
// import { UrlValidator } from "../../../shared/helper/url-validators.helper";

// @Component({
//   selector: "app-board-form",
//   standalone: true,
//   imports: [
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatCardModule,
//     ReactiveFormsModule,
//   ],
//   templateUrl: "./board-form.component.html",
//   styleUrl: "./board-form.component.scss",
// })
// export class BoardFormComponent {
//   public form = new FormGroup(
//     {
//       title: new FormControl("", [Validators.required]),
//       description: new FormControl("", [Validators.required]),
//       url: new FormControl("", [Validators.required, UrlValidator.isUrlValid("url")]),
//     },
    
//   );
//   @Output() public onRegister = new EventEmitter<IBoardDto>();
//   public RegisterBoard(): void {
//     const userDto: IBoardDto = {
//       title: this.form.controls.title.value!,
//       description: this.form.controls.description.value!,
//       url: this.form.controls.url.value!,
//     };
//     console.log(userDto);
//     this.onRegister.next(userDto);
	
//   }
//   constructor(){
//   }
// }


import { Component, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IBoardDto } from '../../../core/models/board.model';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { UrlValidator } from '../../../shared/helper/url-validators.helper';
import { BoardsService } from '../../services/boards.service';
@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  
standalone: true,
})
export class BoardFormComponent {
  @Output() onRegister = new EventEmitter<IBoardDto>();
  @Input() nextId!: number;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<BoardFormComponent>, private formBuilder: FormBuilder, private boardsService: BoardsService,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nextId = this.data.nextId;
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required, UrlValidator.isUrlValid("url")]]
    });
   
  }
  
  registerBoard(type: 'cancel' | 'valid') {
    if (type === 'cancel') {
      this.dialogRef.close();
    }
    else if (this.form.valid) {
   
      console.log(this.nextId);
      const boardDto: IBoardDto = {
        id: this.nextId,
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
        url: this.form.controls['url'].value
      };
      this.onRegister.emit(boardDto);
      this.boardsService.saveBoard(boardDto);
      this.dialogRef.close();
    }
  }
  
}
