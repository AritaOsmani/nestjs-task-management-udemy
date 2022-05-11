import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot("mongodb://arita:arita123@localhost:27017/task_management")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
