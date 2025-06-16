import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(private prisma: PrismaService) {}

  async createToken(token: string, movies: any[], ttlMs: number) {
    const expiresAt = new Date(Date.now() + ttlMs);
    return this.prisma.token.create({
      data: { token, movies, expiresAt },
    });
  }

  async getMovies(token: string): Promise<any[]> {
    const record = await this.prisma.token.findUnique({ where: { token } });
    if (!record || record.expiresAt < new Date()) {
      throw new NotFoundException('Token expired or not found');
    }
    return record.movies as any[];
  }

    @Cron('0 0 * * *')
  async cleanupExpired() {
    const now = new Date();
    const { count } = await this.prisma.token.deleteMany({
      where: { expiresAt: { lt: now } },
    });
    this.logger.log(`Cleaned up ${count} expired tokens`);
  }
}