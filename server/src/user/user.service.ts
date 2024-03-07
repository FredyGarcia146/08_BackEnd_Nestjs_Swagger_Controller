import { Injectable } from '@nestjs/common';
import { User } from './modelo/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.userRespository.create(user);
    //console.log(newTask)

    //console.log(newTask)
    return this.userRespository.save(newUser);
  }

  getAllUsers() {
    return this.userRespository.find();
  }

  findOneByEmail(email:string) {
    return this.userRespository.findOneBy({  email })
  }

  findOneByEmailWithPassword(email:string) {
    return this.userRespository.findOne({
      where: { email },
      select:['id','email','role','password']
    });
  }

}
