import {
  Controller,
  Get,
  Param,
  Render,
  NotFoundException,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';
import { TokenService } from '../token/token.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private tokenService: TokenService) {}

  @Get(':token')
  @ApiOperation({ summary: 'Show 10 random movies for a given token' })
  @ApiParam({
    name: 'token',
    description: 'UUID token returned by /qr',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Renders an HTML page listing 10 movies',
  })
  @ApiResponse({ status: 404, description: 'Token expired or not found' })
  async showMovies(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const movies = await this.tokenService.getMovies(token);
      return res.render('movies', { movies });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return res
          .status(404)
          .render('error', { message: err.message });
      }
      throw err;
    }
  }
}
    