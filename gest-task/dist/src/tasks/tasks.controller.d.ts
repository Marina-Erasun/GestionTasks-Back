import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto | import("../interface/IResponse").IResponse | import("@nestjs/common").HttpException>;
    getTasks(): Promise<import("../interface/IResponse").IResponse | import("@nestjs/common").HttpException | import("./entities/task.entity").Task[]>;
    remove(id: number): Promise<import("./entities/task.entity").Task | import("../interface/IResponse").IResponse | import("@nestjs/common").HttpException>;
}
