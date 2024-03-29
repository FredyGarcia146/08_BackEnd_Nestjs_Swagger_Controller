import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type_task } from './model/type_task.entity';

@Injectable()
export class TypeTasksService {

    constructor(
        @InjectRepository(Type_task) private readonly typeTaskRespository: Repository<Type_task>,
      ) {}
    
    
      getAllTypeTasks() {
        return this.typeTaskRespository.find();
      }

}
