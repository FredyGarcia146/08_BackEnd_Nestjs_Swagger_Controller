import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { request } from 'http';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

// auth
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  GetTasks() {
    return this.tasksServices.getAllTasks();
  }

  
  @Get(':id/get')
  GetTask(@Param('id') id: number) {
    return this.tasksServices.getOneTasks(id);
  }
  

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Get('user')
  GetTaskUser( @ActiveUser() user: UserActiveInterface) {
    return this.tasksServices.getUserTasks(user);
  }


  @Auth(Role.USER)
  @ApiBearerAuth()
  @Post('add')
  CreateTask(@Body() newTask: CreateTaskDto,@ActiveUser() user: UserActiveInterface) {
    return this.tasksServices.createTask(newTask,user);
  }

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Delete(':id/delete')
  DeleteTask(@Param('id') id: number,@ActiveUser() user: UserActiveInterface) {
    return this.tasksServices.deleteTask(id,user);
  }

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Patch(':id/toggleDone')
  UpdateToggleTask(@Param('id') id: number,@ActiveUser() user: UserActiveInterface) {

    return this.tasksServices.patchToggleTask(id,user);
  }

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Put(':id/edit')
  UpdateTask(@Param('id') id: number, @Body() newTask: CreateTaskDto,@ActiveUser() user: UserActiveInterface) {
    return this.tasksServices.updateTask(id, newTask,user);
  }
}
