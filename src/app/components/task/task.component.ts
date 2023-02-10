import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) { }

  @Input() task!: Task

  currentUser!: User

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: any) => this.currentUser = user);
  }

  editTask() {
    this.modalService.edit(this.task)
  }
}
