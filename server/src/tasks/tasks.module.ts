import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './model/task.entity';
import { TypeTasksService } from '../type_tasks/type_tasks.service';
import { TypeTasksModule } from '../type_tasks/type_tasks.module';


@Module({
  imports:[TypeOrmModule.forFeature([Task]),TypeTasksModule],
  controllers: [TasksController],
  providers: [TasksService,TypeTasksService],
})
export class TasksModule {}
