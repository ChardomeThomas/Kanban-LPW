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
  public getId(board: IBoardDto[]): number {
    let maxId = 0;
    for (const boards of board) {
      if (boards.id > maxId) {
        maxId = boards.id;
        console.log(maxId);
        
      }
    }
    return maxId + 1;
  }
}
