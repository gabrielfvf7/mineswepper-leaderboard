import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { LeaderboardQueryDto } from './dto/leaderboard-query.dto';
import { DIFFICULTY } from '../../constants';

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async createScore(@Body(ValidationPipe) createScoreDto: CreateScoreDto) {
    return this.scoresService.createScore(createScoreDto);
  }

  @Get('leaderboard/:difficulty')
  async getLeaderboard(
    @Param() params: LeaderboardQueryDto,
    @Query('limit') limit?: string,
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const validDifficulties = Object.values(DIFFICULTY);
    if (!validDifficulties.includes(params.difficulty as Difficulty)) {
      throw new BadRequestException(
        `Invalid difficulty: ${params.difficulty}. Valid options: ${validDifficulties.join(', ')}`,
      );
    }
    return this.scoresService.getLeaderboard(
      params.difficulty as Difficulty,
      limitNumber,
    );
  }

  @Get('player/:playerName/:difficulty')
  async getPlayerBestScore(
    @Param('playerName') playerName: string,
    @Param('difficulty') difficulty: string,
  ) {
    // Validar se difficulty é válido
    const validDifficulties = Object.values(DIFFICULTY);
    if (!validDifficulties.includes(difficulty as Difficulty)) {
      throw new BadRequestException(
        `Invalid difficulty: ${difficulty}. Valid options: ${validDifficulties.join(', ')}`,
      );
    }

    return this.scoresService.getPlayerBestScore(
      playerName,
      difficulty as Difficulty,
    );
  }

  @Get('player/:playerName')
  async getAllPlayerScores(@Param('playerName') playerName: string) {
    return this.scoresService.getAllPlayerScores(playerName);
  }
}
