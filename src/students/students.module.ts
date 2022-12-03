import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StudentsController } from './controllers/students.controller';
import { Students } from './services/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/models/Student';
import {} from './middlewares/students.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [Students],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: 'students',
      method: RequestMethod.GET,
    });
  }
}
