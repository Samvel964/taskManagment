import { TaskStatusEnum } from "../services/tasks.service"

// export interface Task {
//   id: number
//   name: string
//   description: string
//   status: TaskStatus
//   assigny?: number
//   createData: string
//   updateDate : string
// }

export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public status: TaskStatusEnum,
    public assigny: number,
    public createData: string,
    public updateDate?: string
  ){}
}

export interface ViewTask {
  id: number
  name: string
  description: string
  status: string
  assigny?: number
}

export type TaskStatus = 
  TaskStatusEnum.todo | 
  TaskStatusEnum.inProgress | 
  TaskStatusEnum.QA | 
  TaskStatusEnum.done

