import {
  IsString,
  IsNumber,
  IsIn,
  IsPositive,
  Length,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DIFFICULTY } from '../../../constants';

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

class BoardConfigDto {
  @IsNumber()
  @Min(8)
  @Max(30)
  rows: number;

  @IsNumber()
  @Min(8)
  @Max(30)
  cols: number;

  @IsNumber()
  @Min(1)
  @Max(200)
  mines: number;
}

export class CreateScoreDto {
  @IsString()
  @Length(1, 50)
  playerName: string;

  @IsString()
  @IsIn(Object.values(DIFFICULTY))
  difficulty: Difficulty;

  @IsNumber()
  @IsPositive()
  @Min(1) // Mínimo 1 segundo (anti-cheat básico)
  @Max(9999) // Máximo 2h45min
  timeInSeconds: number;

  @ValidateNested()
  @Type(() => BoardConfigDto)
  boardConfig: BoardConfigDto;
}
