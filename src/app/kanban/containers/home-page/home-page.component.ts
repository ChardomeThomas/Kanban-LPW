import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule  } from '@angular/router';
import { BoardFormComponent } from '../../components/board-form/board-form.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ RouterModule, BoardFormComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public userName: string|undefined;
  showBoardForm: boolean = false;
  toggleBoardForm() {
    this.showBoardForm = !this.showBoardForm;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.authService.userLoggedFullName;
  }
}
