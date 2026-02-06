import { IsString, IsIn, IsOptional, IsNumberString } from 'class-validator';
import { DIFFICULTY } from '../../../constants';

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export class LeaderboardQueryDto {
  @IsString()
  @IsIn(Object.values(DIFFICULTY))
  difficulty: Difficulty;

  @IsOptional()
  @IsNumberString()
  limit?: string; // Quantos scores retornar (padrão: 10)
}
