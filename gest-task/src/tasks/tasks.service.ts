import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/interface/IResponse';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  
  async create(task: CreateTaskDto): Promise<HttpException | CreateTaskDto | IResponse> {
    try{
      const taskFound = await this.tasksRepository.findOne({
        where: { title: task.title }
      });
    if (taskFound) {
            throw new HttpException(
              `La tarea con nombre ${taskFound.title} ya existe en la base de datos`,
              HttpStatus.CONFLICT,
            );
          }
          const newTask = this.tasksRepository.create(task);
          const savedTask = await this.tasksRepository.save(newTask);
          if (savedTask) {
            return {
              message: `La tarea ha sido creado exitosamente`,
              data: savedTask,
              statusCode: HttpStatus.CREATED,
            };
          }
        } catch (error) {
          if (error.status === HttpStatus.CONFLICT) {
            throw error;
          }
          throw new HttpException(
            'Error del servidor',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
  
   async getTasks(): Promise<HttpException | Task[] | IResponse> {
    try {
      const tasks = await this.tasksRepository.find();

      if (!tasks.length)
        throw new HttpException(
          "No existen tareas registradas",
          HttpStatus.NOT_FOUND,
        );
      else {
        return {
          message: 'La lista de tareas está compuesta por:',
          data: tasks,
          statusCode: HttpStatus.OK,
        };
      }
    }  catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error
      }
      throw new HttpException(
        "Error del servidor",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  async deleteTask(
    id: number,
  ): Promise<HttpException | Task | IResponse> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id: id },
      });
      if (!task) {
        throw new HttpException(
          'La tarea no existe en la base de datos',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.tasksRepository.delete({ id: id });
      return {
        message: 'Se ha eliminado la tarea: ',
        data: task.title,
        statusCode: HttpStatus.OK,
      }
    } catch (error) {
      if (error.status ===  HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}

  