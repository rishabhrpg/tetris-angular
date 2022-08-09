import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoundaryService } from '../../services/boundary/boundary.service';
import { TetrisGameService } from '../../services/tetris-game/tetris-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  /**
   * The last time the frame was rendered.
   */
  private lastRenderTime: number = 0;

  constructor(
    public boundaryService: BoundaryService,
    public tetrisGameService: TetrisGameService
  ) { }

  ngOnInit(): void {
    this.tetrisGameService.registerKeyBoardEvents();
    window.requestAnimationFrame(ctime => this.gameLoop(ctime));
  }

  /**
   * Game loop.
   * @param ctime current time
   */
  public gameLoop(ctime: number) {
    window.requestAnimationFrame(ctime => this.gameLoop(ctime));
    if (ctime > this.lastRenderTime + 1000 / environment.tetrisGame.framesPerSecond) {
      this.lastRenderTime = ctime;
      this.tetrisGameService.update();
    }
  }

}
