import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const shapePoints = Points.get(game.shape) || 0;
    const outcomePoints = Points.get(game.outcome) || 0;
    totalPoints += shapePoints + outcomePoints;
  }

  return totalPoints;
};
