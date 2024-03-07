import { Role } from '../../common/enum/rol.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from 'src/tasks/model/task.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({select:false})
  password: string;

  @Column({type:'enum',default:Role.USER, enum:Role})
  role: Role;

  @OneToMany(() => Task, (task) => task.user_id_R)
  task_R: Task[];

}
