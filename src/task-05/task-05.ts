import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY: OrderBy = 'title';
const DEFAULT_DIRECTION: Direction = 'ASC';

const filterByTitleOrDescription = (movie: Movie, query: string): boolean => {
  const normalizedQuery = query.toLowerCase();
  return (
    movie.title.toLowerCase().includes(normalizedQuery) ||
    movie.overview.toLowerCase().includes(normalizedQuery)
  );
};

const filterByGenre = (movie: Movie, genres: Genre[]): boolean => {
  return genres.some((genre) => movie.genres?.includes(genre));
};

const applyPagination = (movies: Movie[], limit: number, offset: number): Movie[] => {
  return movies.slice(offset, offset + limit);
};

const sortMovies = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  return movies.sort((a, b) => {
    const aValue: string | number | Date | undefined = a[orderBy];
    const bValue: string | number | Date | undefined = b[orderBy];

    if (aValue === undefined || bValue === undefined) {
      return aValue === bValue ? 0 : aValue === undefined ? 1 : -1;
    }

    if (direction === 'ASC') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};
export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query, genre, orderBy, direction, limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = params;

  let movies: Movie[] = await MovieService.getMovies();

  if (query) {
    movies = movies.filter((movie) => filterByTitleOrDescription(movie, query));
  }

  if (genre?.length) {
    movies = movies.filter((movie) => filterByGenre(movie, genre));
  }

  const total = movies.length;

  movies = sortMovies(movies, orderBy || DEFAULT_ORDER_BY, direction || DEFAULT_DIRECTION);
  movies = applyPagination(movies, limit, offset);

  return { total, movies };
};
