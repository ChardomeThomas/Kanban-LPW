// import { Component, EventEmitter, Output } from '@angular/core';
// import { AuthService } from '../../../auth/services/auth.service';
// import { Router, RouterModule  } from '@angular/router';
// import { BoardFormComponent } from '../../components/board-form/board-form.component';
// import { CommonModule } from '@angular/common';
// import { IBoardDto } from '../../../core/models/board.model';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [ RouterModule, BoardFormComponent, CommonModule],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.scss'
// })
// export class HomePageComponent {
//   public userName: string|undefined;
//   showBoardForm: boolean = false;


//   toggleBoardForm() {
//     this.showBoardForm = !this.showBoardForm;
//   }

//   constructor(private authService: AuthService, private router: Router ) {
//     this.userName = this.authService.userLoggedFullName;
//   }
  
// }


import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardFormComponent } from '../../components/board-form/board-form.component';
import { IBoardDto } from '../../../core/models/board.model';
import { Router, RouterModule  } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [ RouterModule],
})
export class HomePageComponent {
  public userName: string | undefined;

  constructor(private dialog: MatDialog) {
    this.userName = 'Username'; // Remplacez ceci par votre logique pour récupérer le nom d'utilisateur
  }

  openBoardDialog() {
    const dialogRef = this.dialog.open(BoardFormComponent, {
      width: '500px'
    });

    dialogRef.componentInstance.onRegister.subscribe((boardDto: IBoardDto) => {
      console.log('Board registered:', boardDto);
      // Vous pouvez ajouter votre logique pour enregistrer le tableau ici
    });
  }
}
