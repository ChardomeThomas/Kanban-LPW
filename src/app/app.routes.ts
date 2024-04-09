import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/containers/login-page/login-page.component';
import { BoardPageComponent } from './kanban/containers/board-page/board-page.component';
import { RegisterPageComponent } from './auth/containers/register-page/register-page.component';
import { HomePageComponent } from './kanban/containers/home-page/home-page.component';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';
import { authGuard } from './auth/guard/auth.guard';
import { BoardFormComponent } from './kanban/components/board-form/board-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'board/:id', component: BoardPageComponent, canActivate: [authGuard]},
  { path: 'createBoard', component: BoardFormComponent, canActivate: [authGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [authGuard]},
  { path: '**', component: NotFoundPageComponent },
];
