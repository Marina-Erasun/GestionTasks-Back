import { Controller, Get, Post, Body,  Param, Delete} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}

 
