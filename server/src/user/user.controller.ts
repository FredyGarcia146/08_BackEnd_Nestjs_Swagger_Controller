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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

//
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Auth(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  GetUser() {
    return this.userServices.getAllUsers();
  }

  /*
  @Post('add')
  CreateUser(@Body() newUser: CreateUserDto) {
    return this.userServices.createUser(newUser);
  }
  */
}
