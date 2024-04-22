
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardFormComponent } from '../../components/board-form/board-form.component';
import { IBoardDto } from '../../../core/models/board.model';
import { Router, RouterModule  } from '@angular/router';
import {LocalStorageService } from '../../../core/services/local-storage.service';
import { BoardsService } from '../../services/boards.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../../auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [ RouterModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
})


export class HomePageComponent {
  public userName: string | undefined;
  public boards: IBoardDto[] = [];
  private readonly BOARD_DB_KEY = 'board';
  constructor(private dialog: MatDialog, private localStorageService: LocalStorageService, private boardsService: BoardsService, private authService: AuthService) {
    this.userName = 'Username';
  } 
ngOnInit(){
  this.loadBoards();
}

  openBoardDialog() {
    const dialogRef = this.dialog.open(BoardFormComponent, {
      width: '500px',
      height:'500px',
      
    });

    dialogRef.componentInstance.onRegister.subscribe((boardDto: IBoardDto) => {
      // console.log('Board registered:', boardDto);
      
      this.boardsService.saveBoard(boardDto); 
      this.loadBoards(); 
    });
  }
  loadBoards() {
    this.boards = this.localStorageService.getAll(this.BOARD_DB_KEY);

    const userEmail = this.authService.getCurrentUserEmail();

    if (userEmail) { 
      this.boards = this.boards.filter(board => board.email === userEmail);
    } else {
      console.error("L'utilisateur n'est pas connecté.");
    }
  }
  
}
