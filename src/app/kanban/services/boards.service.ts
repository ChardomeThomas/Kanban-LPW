import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IBoardDto } from '../../core/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
	private readonly BOARD_DB_KEY = 'board';

  constructor(private localStorageService: LocalStorageService) { }
  public saveBoard(board: IBoardDto): void {
    return this.localStorageService.setOne(this.BOARD_DB_KEY, board);
  }
}
