import { TetrisBlock } from "../abstracts/tetris-block";
import { Location } from "../interfaces/tetris";

export class SBlock extends TetrisBlock {

  public possibleRotations: Location[][] = [
    [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ]
  ]

  public getColor(): string {
    return '#00ff00';
  }
}
