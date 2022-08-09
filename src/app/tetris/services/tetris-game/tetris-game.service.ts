import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TetrisBlock } from '../../abstracts/tetris-block';
import { IBlock } from '../../blocks/i-block';
import { JBlock } from '../../blocks/j-block';
import { LBlock } from '../../blocks/l-block';
import { OBlock } from '../../blocks/o-block';
import { SBlock } from '../../blocks/s-block';
import { TBlock } from '../../blocks/t-block';
import { ZBlock } from '../../blocks/z-block';
import { Location } from '../../interfaces/tetris';

@Injectable({
  providedIn: 'root'
})
export class TetrisGameService {

  public activeBlock!: TetrisBlock;

  public blocksOnBoard: TetrisBlock[] = [];

  constructor() {
    this.spawnNewBlock();
  }

  public update() {
    this.moveDown();
  }

  public moveDown() {
    if (this.activeBlock?.getShape().every(location => location.y <= 28)) {

      if (this.checkForGameOver()) {
        alert('Game Over');
        this.resetGame();
      }

      this.checkForLines();

      if (this.checkForCollision()) {
        console.log('collision');

        this.blocksOnBoard.push(this.activeBlock);
        this.spawnNewBlock();
        return;
      }
      this.activeBlock?.updateLocation({ x: this.activeBlock.location.x, y: this.activeBlock.location.y + 1 });
    } else {
      this.blocksOnBoard.push(this.activeBlock);
      this.spawnNewBlock();
    }
  }

  public spawnNewBlock() {
    this.activeBlock = this.getRandomBlock();
    this.activeBlock.updateLocation({ x: 5, y: 2 });
  }

  public checkForLines() {
    for (let y = 2; y <= environment.tetrisGame.boardHeight; y++) {
      let partCount = 0;
      this.blocksOnBoard.forEach(block => {
        block.getShape().forEach(location => {
          if (location.y === y) {
            partCount++;
          }
        })
      })


      console.log(partCount);

      if (partCount === environment.tetrisGame.boardWidth - 2) {
        console.log('line', y);
        this.removeLine(y);
      }
    }
  }

  public removeLine(row: number) {
    this.blocksOnBoard = this.blocksOnBoard.filter(block => block.getShape().every(location => location.y !== row));
    this.blocksOnBoard.forEach(block => {
      block.getShape().forEach(location => {
        if (location.y > row) {
          location.y--;
        }
      });
    });
  }

  public checkForCollision() {
    return this.activeBlock?.getShape()
      .some(location => this.blocksOnBoard
        .some(block => block.getShape()
          .some(blockLocation => {
            const result = blockLocation.x === location.x && blockLocation.y === location.y + 1;
            return result;
          })));
  }

  public checkForGameOver() {
    return this.blocksOnBoard.some(block => block.getShape().some(location => location.y <= 2));
  }

  /**
   * Generates a new block at the top of the board.
   * @returns
   */
  public generateNewSpawnLocation(): Location {
    const newLocation: Location = {
      x: Math.floor(Math.random() * 18),
      y: 2
    };
    if (newLocation.x === 0 || newLocation.x === 1) {
      return this.generateNewSpawnLocation();
    }
    return newLocation;
  }

  private getRandomBlock(): TetrisBlock {
    const blocks = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];

    const randomIndex = Math.floor(Math.random() * blocks.length);
    const randomBlock = blocks[randomIndex];
    const block = new randomBlock();
    return block;
  }

  /**
   * Moves block to left
   */
  public moveLeft() {
    if (this.activeBlock?.getShape().every(location => location.x > 2)) {
      this.activeBlock?.updateLocation({ x: this.activeBlock.location.x - 1, y: this.activeBlock.location.y });
    }
  }

  /**
   * Moves block to right
   */
  public moveRight() {
    if (this.activeBlock?.getShape().every(location => location.x <= 18)) {
      this.activeBlock?.updateLocation({ x: this.activeBlock.location.x + 1, y: this.activeBlock.location.y });
    }
  }

  public registerKeyBoardEvents() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === ' ') {
        this.activeBlock?.rotate();
      } else if (event.key === 'ArrowLeft') {
        this.moveLeft();
      } else if (event.key === 'ArrowRight') {
        this.moveRight();
      } else if (event.key === 'ArrowDown') {
        this.moveDown();
      }
    });
  }

  public resetGame() {
    this.blocksOnBoard = [];
    this.spawnNewBlock();
  }
}
