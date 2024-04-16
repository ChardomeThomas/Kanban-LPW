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
    this.localStorageService.setOne(this.BOARD_DB_KEY, board);
  }

  public async getNextId(): Promise<number> {
    const boards = this.localStorageService.getAll(this.BOARD_DB_KEY);
    if (boards.length === 0) {
      return 1; // Si aucun board existant, retourne 1 comme prochain ID
    } else {
      const maxId = Math.max(...boards.map(board => board.id));
      return maxId + 1; // Retourne le prochain ID en ajoutant 1 au maximum des IDs existants
    }
  }
}
