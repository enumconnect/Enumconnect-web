export const GROUND = 180;
export const PLAYER_X = 64;
export const PLAYER_HEIGHT = 44;

export type Obstacle = { x: number; width: number; height: number };
export type Coin = { x: number; height: number };
export type Run = {
  height: number;
  velocity: number;
  distance: number;
  nextObstacle: number;
  obstacles: Obstacle[];
  coins: Coin[];
  collected: number;
  crashed: boolean;
};

export function createRun(): Run {
  return { height: 0, velocity: 0, distance: 0, nextObstacle: 1.3, obstacles: [], coins: [], collected: 0, crashed: false };
}

export function jump(run: Run): Run {
  return run.height === 0 && !run.crashed ? { ...run, velocity: 590 } : run;
}

// A fixed-size world keeps jumps and collision boxes consistent on every screen.
export function advance(run: Run, elapsed: number, random = Math.random, withCoins = true): Run {
  if (run.crashed) return run;
  const dt = Math.min(Math.max(elapsed, 0), 0.035);
  const speed = 220 + Math.min(run.distance / 120, 180);
  const velocity = run.velocity - 1800 * dt;
  const height = Math.max(0, run.height + velocity * dt);
  const obstacles = run.obstacles
    .map((obstacle) => ({ ...obstacle, x: obstacle.x - speed * dt }))
    .filter((obstacle) => obstacle.x + obstacle.width > 0);
  let collected = run.collected;
  const coins = run.coins
    .map((coin) => ({ ...coin, x: coin.x - speed * dt }))
    .filter((coin) => {
      if (coin.x + 8 < 0) return false;
      const touched = PLAYER_X + 28 > coin.x - 8 && PLAYER_X + 4 < coin.x + 8 &&
        height < coin.height + 10 && height + PLAYER_HEIGHT > coin.height - 10;
      if (touched) collected++;
      return !touched;
    });
  let nextObstacle = run.nextObstacle - dt;
  if (nextObstacle <= 0) {
    obstacles.push({ x: 620, width: random() < 0.5 ? 28 : 36, height: random() < 0.5 ? 29 : 38 });
    if (withCoins) coins.push({ x: 636, height: 76 });
    nextObstacle = 1.35 + random() * 0.7;
  }
  const crashed = obstacles.some((obstacle) =>
    PLAYER_X + 25 > obstacle.x + 3 &&
    PLAYER_X + 7 < obstacle.x + obstacle.width - 3 &&
    height + 5 < obstacle.height &&
    height + PLAYER_HEIGHT - 4 > 0,
  );
  return {
    height, velocity: height === 0 ? 0 : velocity,
    distance: run.distance + speed * dt, nextObstacle, obstacles, coins, collected, crashed,
  };
}
