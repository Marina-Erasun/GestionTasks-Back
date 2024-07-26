import { TaskStatus } from '../enum/enum.task';
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createAt: Date;
}
