import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/pages/board/board.component.service';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [BoardService]
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(
    private boardService: BoardService,
    private userService: UserService,
    private taskService: TaskService
  ) {}
  
  
  todo: Task[] = [];
  inProgress: Task[] = [];
  QA: Task[] = [];
  done: Task[] = [];

  currentUser!: User

  subscriptions: Subscription[] = [];
  subTodo$!: Subscription;
  subInProgress$!: Subscription;
  subQA$!: Subscription;
  subDone$!: Subscription;
  subCurrentUser$!: Subscription;


  ngOnInit(): void {
    this.taskService.taskTransformToView();
    this.taskService.viewTaskList$.subscribe(data => {
      this.boardService.devideByTaskStatus(data);
    })
    this.subCurrentUser$ = this.userService.checkCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
      this.taskService.setCurrentUserTasks(user.id);
      this.boardService.devideByTaskStatus(this.taskService.currentUserTasks$.getValue());
    });
    this.subscriptions.push(this.subCurrentUser$);
      
    this.subTodo$ = this.boardService.todo$.subscribe((res: Task[] | any) => this.todo = res);
    this.subInProgress$ = this.boardService.inProgress$.subscribe((res: Task[]) => this.inProgress = res);
    this.subQA$ = this.boardService.QA$.subscribe((res: Task[]) => this.QA = res);
    this.subDone$ = this.boardService.done$.subscribe((res: Task[]) => this.done = res);
    this.subscriptions.push(this.subTodo$);
    this.subscriptions.push(this.subInProgress$);
    this.subscriptions.push(this.subQA$);
    this.subscriptions.push(this.subDone$);
  }

  drop(event: CdkDragDrop<Task[]>) {    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.taskService.changeStatus(event);    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
