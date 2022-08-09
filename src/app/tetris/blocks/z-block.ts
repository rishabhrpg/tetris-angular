import { TetrisBlock } from "../abstracts/tetris-block";
import { Location } from "../interfaces/tetris";

export class ZBlock extends TetrisBlock {


  public possibleRotations: Location[][] = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ],
    [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 }
    ]
  ];

  public getColor(): string {
    return '#FE4C40';
  }
}
