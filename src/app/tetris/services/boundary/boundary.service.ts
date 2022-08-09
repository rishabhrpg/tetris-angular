import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../../interfaces/tetris';

@Injectable({
  providedIn: 'root'
})
export class BoundaryService {

  public boundary: Location[] = [];

  constructor() {
    this.setupBoundary();
  }

  private setupBoundary(): void {
    this.boundary = [];
    for (let i = 1; i <= environment.tetrisGame.boardWidth; i++) {
      this.boundary.push({ x: i, y: 1 });
    }
    for (let i = 1; i <= environment.tetrisGame.boardWidth; i++) {
      this.boundary.push({ x: i, y: environment.tetrisGame.boardHeight });
    }
    for (let i = 2; i <= environment.tetrisGame.boardHeight; i++) {
      this.boundary.push({ x: 1, y: i });
    }
    for (let i = 2; i <= environment.tetrisGame.boardHeight; i++) {
      this.boundary.push({ x: environment.tetrisGame.boardWidth, y: i });
    }
  }
}
