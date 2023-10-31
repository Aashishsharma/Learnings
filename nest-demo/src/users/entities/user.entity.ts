import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// this maps to a table in database
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  userpassword: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
