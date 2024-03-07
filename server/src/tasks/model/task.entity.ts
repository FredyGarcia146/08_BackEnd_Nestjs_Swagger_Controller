import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { Type_task } from 'src/type_tasks/model/type_task.entity';
import { User } from 'src/user/modelo/user.entity';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id:number

  @Column()
  type_task_id:number
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  done: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  
  @ManyToOne(() => Type_task, (type_task) => type_task.task_R)
  @JoinColumn({ name: 'type_task_id'})
  type_task_id_R: Type_task;

  @ManyToOne(() => User, (type_task) => type_task.task_R)
  @JoinColumn({ name: 'user_id'})
  user_id_R: Type_task;


  /*
  @ManyToOne(() => Type_task, (type_task) => type_task.task_R)
  @JoinColumn(
    {name:'type_task_id', referencedColumnName:'id'}
  )
  type_task_R: Type_task;
  */

}
