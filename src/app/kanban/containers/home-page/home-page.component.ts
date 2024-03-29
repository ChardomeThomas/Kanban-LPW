import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public userName: string|undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.authService.userLoggedFullName;
  }
}
