import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDto } from './dto/create-score.dto';
import { DIFFICULTY } from '../../constants';

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async createScore(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(createScoreDto);
    return this.scoreRepository.save(score);
  }

  async getLeaderboard(
    difficulty: Difficulty,
    limit: number = 10,
  ): Promise<Score[]> {
    return this.scoreRepository.find({
      where: { difficulty },
      order: { timeInSeconds: 'ASC' }, // Menor tempo = melhor score
      take: limit,
    });
  }

  async getPlayerBestScore(
    playerName: string,
    difficulty: Difficulty,
  ): Promise<Score | null> {
    return this.scoreRepository.findOne({
      where: { playerName, difficulty },
      order: { timeInSeconds: 'ASC' },
    });
  }

  async getAllPlayerScores(playerName: string): Promise<Score[]> {
    return this.scoreRepository.find({
      where: { playerName },
      order: { createdAt: 'DESC' },
    });
  }
}
