import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IUserDto } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_DB_KEY = 'users';

  constructor(private localStorageService: LocalStorageService) {}

  public getUserByEmail(email: string): IUserDto {
    return this.localStorageService.getOne(this.USER_DB_KEY, email, 'email');
  }

  public saveUser(user: IUserDto): void {
    return this.localStorageService.setOne(this.USER_DB_KEY, user);
  }
}
