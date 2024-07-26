import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enum/enum.task';
export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

