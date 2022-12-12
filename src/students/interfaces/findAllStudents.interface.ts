import { Student } from './students.interface';

export interface findAllStudentsType {
  rows: Student[];
  count: number;
}
