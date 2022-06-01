import { cloneDeep } from 'lodash'

export const wumpusWorld = [
  ['A', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', 'G', '#', '#', '#', 'W', '#', '#'],
  ['#', '#', '#', '#', '#', 'P', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
];

export class WumpusWorld {
  world: string[][];

  constructor(world: string[][]) {
    this.world = world;
  }

  getWorld() {
    return this.world;
  }

  getPlayerPosition() {
    return this.getPosition('A');
  }

  getWumpusPosition() {
    return this.getPosition('W');
  }

  getGoldPosition() {
    return this.getPosition('G');
  }

  getPitPosition() {
    return this.getPosition('P');
  }

  getPosition(character: string) {
    for (let i = 0; i < this.world.length; i++) {
      for (let j = 0; j < this.world[i].length; j++) {
        if (this.world[i][j] === character) {
          return { x: i, y: j };
        }
      }
    }
  }

  getMaskedWorld() {
    const world = cloneDeep(this.getWorld());

    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        if (world[i][j] !== 'A' && world[i][j] !== '.') {
          world[i][j] = '#';
        }
      }
    }

    return world;
  }

  insertVisitedPosition(position: { x: number; y: number }) {
    this.world[position.x][position.y] = '.';
  }

  movePlayer(direction: 'up' | 'down' | 'left' | 'right') {
    const playerPosition = this.getPlayerPosition();

    if (playerPosition) {
      const newPosition = {
        x: playerPosition?.x,
        y: playerPosition?.y
      };

      switch (direction) {
        case 'up':
          newPosition.x -= 1;
          break;
        case 'down':
          newPosition.x += 1;
          break;
        case 'left':
          newPosition.y -= 1;
          break;
        case 'right':
          newPosition.y += 1;
          break;
      }

      if (this.isValidPosition(newPosition)) {
        if (this.hasPlayerWon(newPosition)) {
          return 'WON';
        }

        if (this.isPlayerDeadByPit(newPosition)) {
          return "DEAD_BY_PIT";
        }

        if (this.isPlayerDeadByWumpus(newPosition)) {
          return 'DEAD_BY_WUMPUS';
        }

        this.world[playerPosition.x][playerPosition.y] = '.';
        this.world[newPosition.x][newPosition.y] = 'A';
      }
    }
  }

  isValidPosition(position: { x: number; y: number }) {
    return (
      position.x >= 0 &&
      position.x < this.world.length &&
      position.y >= 0 &&
      position.y < this.world[0].length
    );
  }

  isPlayerDeadByWumpus(playerPosition: { x: number; y: number }) {
    const wumpusPosition = this.getWumpusPosition();

    if (playerPosition && wumpusPosition) {
      return playerPosition.x === wumpusPosition.x && playerPosition.y === wumpusPosition.y;
    }
  }

  isPlayerDeadByPit(playerPosition: { x: number; y: number }) {
    const pitPosition = this.getPitPosition();

    if (playerPosition && pitPosition) {
      return playerPosition.x === pitPosition.x && playerPosition.y === pitPosition.y;
    }
  }

  isPlayerCloseToWumpus() {
    const playerPosition = this.getPlayerPosition();
    const wumpusPosition = this.getWumpusPosition();

    if (playerPosition && wumpusPosition) {
      return (
        Math.abs(playerPosition.x - wumpusPosition.x) <= 1 &&
        Math.abs(playerPosition.y - wumpusPosition.y) <= 1
      );
    }
  }

  isPlayerCloseToPit() {
    const playerPosition = this.getPlayerPosition();
    const pitPosition = this.getPitPosition();

    if (playerPosition && pitPosition) {
      return (
        Math.abs(playerPosition.x - pitPosition.x) <= 1 &&
        Math.abs(playerPosition.y - pitPosition.y) <= 1
      );
    }
  }

  isPlayerCloseToGold() {
    const playerPosition = this.getPlayerPosition();
    const goldPosition = this.getGoldPosition();

    if (playerPosition && goldPosition) {
      return (
        Math.abs(playerPosition.x - goldPosition.x) <= 1 &&
        Math.abs(playerPosition.y - goldPosition.y) <= 1
      );
    }
  }

  hasPlayerWon(playerPosition: { x: number; y: number }) {
    const goldPosition = this.getGoldPosition();

    if (playerPosition && goldPosition) {
      return playerPosition.x === goldPosition.x && playerPosition.y === goldPosition.y;
    }
  }


  movePlayerAndValidate(direction: 'up' | 'down' | 'left' | 'right') {
    const status = this.movePlayer(direction);

    if (status) return status;

    return true;
  }

  resetWorld(newWorld: string[][]) {
    this.world = newWorld;
  }
}