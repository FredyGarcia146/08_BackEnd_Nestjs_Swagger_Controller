import { Controller,Get } from '@nestjs/common';
import { TypeTasksService } from './type_tasks.service';

//auth
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';



@ApiTags('type-tasks')
@Controller('type-tasks')
export class TypeTasksController {

    constructor(private typeTaskServices : TypeTasksService){}

    
    @Auth(Role.USER)
    @ApiBearerAuth()
    @Get()
    GetTasks(){
      return this.typeTaskServices.getAllTypeTasks();
    }

}
