import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.scss'
})
export class BoardFormComponent {
CreateBoard() {
  console.log('Create Board');
}
}
