import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  password: string;
}
