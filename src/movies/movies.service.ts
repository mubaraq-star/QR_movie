import { Injectable, Logger } from '@nestjs/common';
import { MoviesData } from 'src/common/json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private allMovies: any[] = [];

  constructor(private config: ConfigService) {
    this.allMovies = MoviesData;
    this.logger.log(`Loaded ${this.allMovies.length} movies`);
  }

  getRandomMovies(count = 10): any[] {
    const randomMovies = [...this.allMovies].sort(() => 0.5 - Math.random()).slice(0, count);
    this.logger.debug(`Selected ${JSON.stringify(randomMovies)} random movies`);
    return randomMovies.slice(0, count).map(this.addPosterUrl);
  }

  private addPosterUrl = (m: any) => {
    let raw =
      m.Poster && m.Poster !== 'N/A'
        ? m.Poster
        : m.Images?.[0] ?? '';

    if (raw.startsWith('http://')) raw = raw.replace('http://', 'https://');
    m.posterSrc = raw || 'https://via.placeholder.com/300x450?text=No+Image';
    return m;
  };


}