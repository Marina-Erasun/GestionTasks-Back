"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(task) {
        try {
            const taskFound = await this.tasksRepository.findOne({
                where: { title: task.title }
            });
            if (taskFound) {
                throw new common_1.HttpException(`La tarea con nombre ${taskFound.title} ya existe en la base de datos`, common_1.HttpStatus.CONFLICT);
            }
            const newTask = this.tasksRepository.create(task);
            const savedTask = await this.tasksRepository.save(newTask);
            if (savedTask) {
                return {
                    message: `La tarea ha sido creado exitosamente`,
                    data: savedTask,
                    statusCode: common_1.HttpStatus.CREATED,
                };
            }
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.CONFLICT) {
                throw error;
            }
            throw new common_1.HttpException('Error del servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTasks() {
        try {
            const tasks = await this.tasksRepository.find();
            if (!tasks.length)
                throw new common_1.HttpException("No existen tareas registradas", common_1.HttpStatus.NOT_FOUND);
            else {
                return {
                    message: 'La lista de tareas está compuesta por:',
                    data: tasks,
                    statusCode: common_1.HttpStatus.OK,
                };
            }
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.NOT_FOUND) {
                throw error;
            }
            throw new common_1.HttpException("Error del servidor", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTask(id) {
        try {
            const task = await this.tasksRepository.findOne({
                where: { id: id },
            });
            if (!task) {
                throw new common_1.HttpException('La tarea no existe en la base de datos', common_1.HttpStatus.NOT_FOUND);
            }
            await this.tasksRepository.delete({ id: id });
            return {
                message: 'Se ha eliminado la tarea: ',
                data: task.title,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.NOT_FOUND) {
                throw error;
            }
            throw new common_1.HttpException('Error del servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map