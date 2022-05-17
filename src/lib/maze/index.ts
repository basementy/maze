const findStart = (maze: string[][], startSymbol: string) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === startSymbol) {
        return { x: j, y: i };
      }
    }
  }
};

const findEnd = (maze: string[][], endSymbol: string) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === endSymbol) {
        return { x: j, y: i };
      }
    }
  }
};

const getNeighbors = (position: { x: number; y: number }, maze: string[][]) => {
  const neighbors = [];

  if (position.y > 0 && maze[position.y - 1][position.x] !== "#") {
    neighbors.push({ x: position.x, y: position.y - 1 });
  }

  if (position.y < maze.length - 1 && maze[position.y + 1][position.x] !== "#") {
    neighbors.push({ x: position.x, y: position.y + 1 });
  }

  if (position.x > 0 && maze[position.y][position.x - 1] !== "#") {
    neighbors.push({ x: position.x - 1, y: position.y });
  }

  if (position.x < maze[0].length - 1 && maze[position.y][position.x + 1] !== "#") {
    neighbors.push({ x: position.x + 1, y: position.y });
  }

  return neighbors;
};

export const getMazePathUsingBreadthFirstSearch = (maze: string[][], startSymbol: string, endSymbol: string) => {
  const start = findStart(maze, startSymbol);
  const end = findEnd(maze, endSymbol);

  const visited = new Set<string>();

  const queue = [start];
  const path = [];

  path.push(start);

  while (queue.length) {
    const current = queue.shift() as { x: number; y: number };

    if (current.x === end?.x && current.y === end?.y) {
      return path;
    }

    visited.add(`${current.x}-${current.y}`);

    const neighbors = getNeighbors(current, maze);

    for (const neighbor of neighbors) {
      if (visited.has(`${neighbor.x}-${neighbor.y}`)) {
        continue;
      }

      queue.push(neighbor);
      path.push(neighbor);
    }
  }

  return path;
}
