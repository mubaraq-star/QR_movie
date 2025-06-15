// import { Injectable, Logger } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { MoviesService } from '../movies/movies.service';
// import { TokenService } from '../token/token.service';
// import { v4 as uuidv4 } from 'uuid';
// import QRCode from 'qrcode';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class QrService {
//   private readonly logger = new Logger(QrService.name);
//   private currentToken: string;

//   constructor(
//     private movies: MoviesService,
//     private tokenService: TokenService,
//     private config: ConfigService,
//   ) {
//     this.rotate();
//   }

//   @Cron('*/10 * * * * *')
//   async rotate() {
//     const token = uuidv4();
//     const movies = this.movies.getRandomMovies();
//     await this.tokenService.createToken(token, movies, 15000);
//     this.currentToken = token;
//     this.logger.debug(`New token: ${token}`);
//   }

//   async getQrDataUrl(): Promise<string> {
//     const base = this.config.get<string>('APP_URL');
//     const link = `${base}/movies/${this.currentToken}`;
//     return QRCode.toDataURL(link);
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoviesService } from '../movies/movies.service';
import { TokenService } from '../token/token.service';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrService {
  private readonly logger = new Logger(QrService.name);
  private currentToken: string;

  constructor(
    private movies: MoviesService,
    private tokenService: TokenService,
    private config: ConfigService,
  ) {
    this.rotate();
  }

  @Cron('*/10 * * * * *')
  async rotate() {
    const token = uuidv4();
    const movies = this.movies.getRandomMovies();
    await this.tokenService.createToken(token, movies, 90000000000);
    this.currentToken = token;
    this.logger.debug(`New token: ${token}`);
  }

  async getQrDataUrl(): Promise<string> {
    const base = this.config.get<string>('APP_URL');
    const link = `${base}/movies/${this.currentToken}`;
    return QRCode.toDataURL(link);
  }
}