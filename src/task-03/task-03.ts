import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const counts: Record<string, number> = { red: 0, green: 0, blue: 0 };

  games.forEach(({ draws }) => {
    const draw: Draw = {
      blue: 0,
      red: 0,
      green: 0,
    };

    draws.forEach((cubeDraw) => {
      for (const color of Object.keys(counts)) {
        const key = color as keyof Draw;
        draw[key] = cubeDraw[key] || 0;
      }

      for (const color of Object.keys(draw)) {
        const key = color as keyof typeof draw;
        counts[key] = Math.max(counts[key], draw[key]);
      }
    });
  });

  return counts.red * counts.green * counts.blue;
};
