import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { DIFFICULTY } from '../../constants';

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerName: string;

  @Column()
  difficulty: Difficulty;

  @Column()
  timeInSeconds: number;

  @Column('simple-json')
  boardConfig: {
    rows: number;
    cols: number;
    mines: number;
  };

  @CreateDateColumn()
  createdAt: Date;
}
