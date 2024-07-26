import { HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/interface/IResponse';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create(task: CreateTaskDto): Promise<HttpException | CreateTaskDto | IResponse>;
    getTasks(): Promise<HttpException | Task[] | IResponse>;
    deleteTask(id: number): Promise<HttpException | Task | IResponse>;
}
