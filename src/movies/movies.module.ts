import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [MoviesService],
  imports: [TokenModule],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}