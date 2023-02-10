import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal$ = new Subject()

  create() {
    this.modal$.next({edit: false, show: true});
  }

  edit(task: Task) {
    this.modal$.next({edit: true, show: true, task});
  }

  close() {
    this.modal$.next({show: false});
  }
}
