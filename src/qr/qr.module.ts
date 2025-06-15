import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { MoviesModule } from '../movies/movies.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [MoviesModule, TokenModule],
  providers: [QrService],
  controllers: [QrController],
})
export class QrModule {}
 