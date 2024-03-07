import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// News Imports 

import { TypeOrmModule} from '@nestjs/typeorm'
import { TypeTasksModule } from './type_tasks/type_tasks.module';
import { TasksModule } from './tasks/tasks.module';

import { ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import envConfig from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.env`,
      //load: [envConfig],
      isGlobal: true,
    }),
     
    TypeOrmModule.forRoot({ 
      type:'mysql', 
      host:process.env.DB_HOST || 'localhost', 
      port: parseInt(process.env.DB_PORT)|| 3306,
      username:process.env.DB_USERNAME || 'root',
      password:process.env.DB_PASSWORD || 'password',
      database:process.env.DB_DATABASE || 'crud_mysql_dev',
      entities:[__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize:false
    }),
    TasksModule,
    TypeTasksModule,
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
