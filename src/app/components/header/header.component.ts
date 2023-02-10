import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BoardService } from 'src/app/pages/board/board.component.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/tasks.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    public modalService: ModalService,
    private taskService: TaskService,
    private boardService: BoardService
  ) { }

  form!: FormGroup;

  currentUser!: User;
  unSub$!: Subscription;

  ngOnInit(): void {
    this.form = new FormGroup({
      searchInput: new FormControl(),
      select: new FormControl()
    })
    this.unSub$ = this.userService.currentUser$
    .subscribe((user: any) => this.currentUser = user);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.taskService.dropList1.next(this.taskService.dropList1.getValue() + 4);
    this.taskService.dropList2.next(this.taskService.dropList2.getValue() + 4);
    this.taskService.dropList3.next(this.taskService.dropList3.getValue() + 4);
    this.taskService.dropList4.next(this.taskService.dropList4.getValue() + 4);
  }

  searchSubmit() {
    const name = this.form.value.searchInput;
    const selectValue = this.form.value.select;
    const result = this.taskService.searchTask(name, selectValue);
    this.boardService.devideByTaskStatus(result);
  }

  emptyInput(event: Event) {
    if ((event.target as HTMLInputElement).value === "") {
      this.searchSubmit();
    }
  }

  ngOnDestroy(): void {
    if(this.unSub$) {
      this.unSub$.unsubscribe();
    }
  }
}
