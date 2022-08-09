import { Location } from "../interfaces/tetris";

export abstract class TetrisBlock {
  /**
   * All possible rotations of the block.
   */
  public abstract possibleRotations: Location[][];

  /**
   * Current rotation of the block.
   */
  public currentRotationIndex = 0;

  /**
   * Location of block on the board
   */
  public location: Location = { x: 0, y: 0 };

  /**
   * Get the shape of the block.
   */
  public getShape(): Location[] {
    return this.possibleRotations[this.currentRotationIndex].map(shape => {
      return {
        x: shape.x + this.location.x,
        y: shape.y + this.location.y,
      };
    });
  }

  /**
   * Get the color of the block.
   */
  public abstract getColor(): string;

  /**
   * Rotate the block clockwise.
   * @returns {Location[]} - The shape of the block after it has been rotated.
   */
  public rotate(): Location[] {
    if (this.currentRotationIndex === this.possibleRotations.length - 1) {
      this.currentRotationIndex = 0;
    } else {
      this.currentRotationIndex++;
    }
    console.log('rotate ', this.currentRotationIndex, '/', this.possibleRotations.length - 1,);
    return this.possibleRotations[this.currentRotationIndex];
  }

  /**
   * Update the location of the block.
   * @param location - The new location of the block.
   */
  public updateLocation(location: Location): void {
    this.location = location;
  }
}
