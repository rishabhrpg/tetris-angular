import { TetrisBlock } from "../abstracts/tetris-block";
import { Location } from "../interfaces/tetris";

export class OBlock extends TetrisBlock {


  /**
   * All possible rotations
   * @returns
   */
  public possibleRotations: Location[][] = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  ];

  public getColor(): string {
    return '#ff4';
  }
}
