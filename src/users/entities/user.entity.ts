import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
