import type { Point } from "~/src/globals";

const directions: Point[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const findWay = (arr: number[][], start: Point): Point[] => {
  const visited: boolean[][] = Array.from({ length: arr.length }, () =>
    Array(arr[0].length).fill(false)
  );
  const path: Point[] = [];

  function dfs(point: Point): boolean {
    const [x, y] = point;
    if (arr[x][y] === 0) {
      path.push(point);
      return true;
    }
    if (arr[x][y] !== 2 || visited[x][y]) return false;

    visited[x][y] = true;
    path.push(point);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < arr.length && newY >= 0 && newY < arr[0].length) {
        if (dfs([newX, newY])) return true;
      }
    }

    path.pop();
    return false;
  }

  if (dfs(start)) {
    return path;
  } else {
    return [];
  }
};

export default findWay;
