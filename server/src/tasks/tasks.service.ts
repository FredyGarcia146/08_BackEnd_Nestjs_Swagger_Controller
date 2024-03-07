import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './model/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Type_task } from '../type_tasks/model/type_task.entity';
import { Role } from 'src/common/enum/rol.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRespository: Repository<Task>,
    @InjectRepository(Type_task)
    private readonly typeTaskRespository: Repository<Type_task>,
  ) {}


  // CREATE
  async createTask(task: CreateTaskDto, user: UserActiveInterface) {
    const type_task = await this.validateTypeTask(task.type_task_id);
    console.log('01-ss');
    const newTask = this.taskRespository.create(task);
    //console.log(newTask)

    if (newTask.done) {
      newTask.done = 1;
    } else {
      newTask.done = 0;
    }

    //console.log(newTask)
    return this.taskRespository.save({
      ...newTask,
      //type_task_id_R: type_task,
      user_id: user.id,
    });
  }
  
  private async validateTypeTask(id: number) {
    const type_task = await this.typeTaskRespository.findOneBy({
      id: id,
    });

    if (!type_task) {
      throw new BadRequestException('Type Task not found');
    }

    return type_task;
  }

  



  //  DELETE
  async deleteTask(id: number, user: UserActiveInterface) {
    await this.findOne(id, user );
    return this.taskRespository.delete(id);
  }

  private async findOne(id_task: number, user: UserActiveInterface) {
    
    const task = await this.taskRespository.findOneBy({ id:id_task });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    this.validateOwnership(task, user);
    return task;
  }

  private validateOwnership(task: Task, user: UserActiveInterface) {
    /*
    if (user.role !== Role.ADMIN && task.user_id !== user.id) {
      throw new UnauthorizedException();
    }
    */ 
    if(user.role==='user'){
      if (task.user_id !== user.id) {
        throw new UnauthorizedException();
      }
    }
    
    return true

    


  }

  // PATCH DONE
  async patchToggleTask(id_task: number, user: UserActiveInterface) {
    
    const newDoneTask = await this.findOne(id_task, user );
    
    if (newDoneTask.done === 0) {
      newDoneTask.done = 1;
    } else {
      newDoneTask.done = 0;
    }

    return this.taskRespository.update(id_task, {done:newDoneTask.done});
  }

  // PUT
  async updateTask(id: number, task: CreateTaskDto, user: UserActiveInterface) {
    await this.findOne(id, user );
    
    const newTask = this.taskRespository.create(task);

    //console.log(newTask);

    if (newTask.done) {
      newTask.done = 1;
    } else {
      newTask.done = 0;
    }

    //console.log(newTask)
    return this.taskRespository.update(id, newTask);
  }

  // GENERAL
  getAllTasks() {
    return this.taskRespository.find();
  }

  getOneTasks(id: number) {
    const newTask = this.taskRespository.findOneBy({ id: id });
    //console.log(newTask)
    return newTask;
  }

  getUserTasks(user: UserActiveInterface) {
    return this.taskRespository.find({where :{ user_id: user.id }});
  }

  

  

  
}
