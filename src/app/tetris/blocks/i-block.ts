import { TetrisBlock } from "../abstracts/tetris-block";
import { Location } from "../interfaces/tetris";

export class IBlock extends TetrisBlock {

  public possibleRotations: Location[][]= [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 }
    ]
  ]

  public getColor(): string {
    return '#4ff';
  }
}
