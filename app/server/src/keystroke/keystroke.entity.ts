import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Keystroke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  key: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}