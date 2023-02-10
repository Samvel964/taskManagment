import { Injectable } from "@angular/core";
import { BehaviorSubject, tap, take } from "rxjs";
import { Task, ViewTask, TaskStatus } from "../models/task.model";
import { CdkDragDrop } from '@angular/cdk/drag-drop';


export enum TaskStatusEnum {
    todo = 'todo',
    inProgress = 'in progress',
    QA = 'QA',
    done = 'done'
}

@Injectable({providedIn: 'root'})
export class TaskService {
    
    constructor() {}

    dropList1 = new BehaviorSubject<number>(0);
    dropList2 = new BehaviorSubject<number>(1);
    dropList3 = new BehaviorSubject<number>(2);
    dropList4 = new BehaviorSubject<number>(3);

    tasksList$ = new BehaviorSubject<Task[]>([
        {
            id: 1,
            name: 'Task number 1',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 1,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 2,
            name: 'Task number 2',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 1,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 3,
            name: 'Task number 3',
            description: 'this is task description',
            status: TaskStatusEnum.done,
            assigny: 1,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 4,
            name: 'Task number 4',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 2,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 5,
            name: 'Task number 5',
            description: 'this is task description',
            status: TaskStatusEnum.inProgress,
            assigny: 2,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 6,
            name: 'Task number 6',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 2,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 7,
            name: 'Task number 7',
            description: 'this is task description',
            status: TaskStatusEnum.QA,
            assigny: 2,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 8,
            name: 'Task number 8',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 3,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 9,
            name: 'Task number 9',
            description: 'this is task description',
            status: TaskStatusEnum.todo,
            assigny: 3,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 10,
            name: 'Task number 10',
            description: 'this is task description',
            status: TaskStatusEnum.inProgress,
            assigny: 3,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 11,
            name: 'Task number 11',
            description: 'this is task description',
            status: TaskStatusEnum.QA,
            assigny: 3,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 12,
            name: 'Task number 12',
            description: 'this is task description',
            status: TaskStatusEnum.QA,
            assigny: 3,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 13,
            name: 'Task number 13',
            description: 'this is task description',
            status: TaskStatusEnum.inProgress,
            assigny: 4,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 14,
            name: 'Task number 14',
            description: 'this is task description',
            status: TaskStatusEnum.QA,
            assigny: 4,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        },
        {
            id: 15,
            name: 'Task number 15',
            description: 'this is task description',
            status: TaskStatusEnum.QA,
            assigny: 4,
            createData: "Mon Jan 30 2023 22:11:51 GMT+0400 (Armenia Standard Time)",
            updateDate: ""
        }
    ])

    viewTaskList$ = new BehaviorSubject<ViewTask[]>([]);

    currentUserTasks$ = new BehaviorSubject<ViewTask[]>([]);

    taskTransformToView()  {
        const view = this.tasksList$.getValue().map((task: Task) => {
            return {
                id: task.id,
                name: task.name,
                description: task.description,
                status: task.status,
                assigny: task.assigny
            }
        });
        this.viewTaskList$.next(view);
    }

    createTask(data: Task) {        
        const tasksList = this.tasksList$.getValue();
        tasksList.push(data);
        this.tasksList$.next(tasksList);
        this.taskTransformToView();
    }

    editTask(
        taskId: number,
        data: {
            name: string, 
            description: string, 
            assigny: number, 
            createData: string, 
            updateDate: string
        }
      ) {
        this.tasksList$.pipe(
          tap((taskList) => {
            const task = taskList.find(task => task.id === taskId);
            this.editItem(task!, data)
            this.taskTransformToView();
          }),
          take(1)
        ).subscribe();
    }
    
    changeStatus(event: CdkDragDrop<Task[]>) {
        switch(event.container.id) {
          case `cdk-drop-list-${this.dropList1.getValue()}`:
            event.container.data.forEach(item => item.status = TaskStatusEnum.todo);
          break
          case `cdk-drop-list-${this.dropList2.getValue()}`:
            event.container.data.forEach(item => item.status = TaskStatusEnum.inProgress);
          break
          case `cdk-drop-list-${this.dropList3.getValue()}`:
            event.container.data.forEach(item => item.status = TaskStatusEnum.QA);
          break
          case `cdk-drop-list-${this.dropList3.getValue()}`:
            event.container.data.forEach(item => item.status = TaskStatusEnum.done);
          break
        }
    }

    searchTask(searchName: string, selectValue?: any): ViewTask[] {
        if (!!searchName && !selectValue) {            
            return this.viewTaskList$.getValue()
            .filter(task => task.name.trim().toLowerCase()
            .search(searchName.trim().toLowerCase()) !== -1);
        } else if (!searchName && !!selectValue) {
            return this.viewTaskList$.getValue()
            .filter(task => task.assigny === +selectValue);
        } else if (!!searchName && !!selectValue){
            return this.viewTaskList$.getValue()
            .filter(task => task.name.trim().toLowerCase()
            .search(searchName) !== -1 && task.assigny === +selectValue);
        } else {
            return this.viewTaskList$.getValue();
        }
    }

    setCurrentUserTasks(userId: number) {        
        const currentUserTasks = this.getTasksByUserId(userId);
        this.currentUserTasks$.next(currentUserTasks);        
    }

    getTasksByUserId(userId: number) {
        return this.tasksList$.getValue().filter((task) => {
            if (userId !== 0) {
                return task.assigny === userId; 
            } else {
                return task
            }
        })
    }

    getTasksByStatus(tasksList: ViewTask[] ,statusArray: TaskStatus[]): Map<string, ViewTask[]>{
        let result = new Map();
        statusArray.forEach((status) => {
            const tasksByStatus = tasksList.filter((task) => task.status === status);
            result.set(status, tasksByStatus);
        });
        return result
    }

    private editItem(task: Task, data: any) {
        task.name = data.name;
        task.description = data.description;
        task.assigny = data.assigny;
        task.createData = data.createData;
        task.updateDate = data.updateDate;
    }
}
