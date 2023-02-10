import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { ViewTask } from '../../models/task.model';
import { TaskService, TaskStatusEnum } from '../../services/tasks.service';


@Injectable()
export class BoardService {

  constructor(private taskService: TaskService) {}

  todo$ = new BehaviorSubject([]);
  inProgress$ = new BehaviorSubject([]);
  QA$ = new BehaviorSubject([]);
  done$ = new BehaviorSubject([]);

  devideByTaskStatus(taskList: ViewTask[]) {
    const data: Map<string, any> = this.taskService.getTasksByStatus(
      taskList, 
      [TaskStatusEnum.todo, TaskStatusEnum.QA, TaskStatusEnum.inProgress, TaskStatusEnum.done]
    );
    this.todo$.next(data.get(TaskStatusEnum.todo));
    this.inProgress$.next(data.get(TaskStatusEnum.inProgress));
    this.QA$.next(data.get(TaskStatusEnum.QA));
    this.done$.next(data.get(TaskStatusEnum.done));
  }
}
