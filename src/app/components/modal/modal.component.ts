import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService, TaskStatusEnum } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    private taskService: TaskService
  ) { }

  form!: FormGroup;
  error: string = "";
  edit!: boolean;
  show = false;
  task!: Task;


  ngOnInit(): void {
    
    this.modalService.modal$.subscribe((res: any) => {
      
      this.edit = res.edit;
      this.show = res.show;

      if(res.task) {
        this.task = res.task;
      }

      this.form = new FormGroup({
        name: new FormControl(res.task?.name, Validators.required),
        description: new FormControl(res.task?.description, Validators.required),
        assigny: new FormControl(res.task?.assigny, Validators.required)
      })
    })   
  }

  submit() {
    if (this.form.valid) {
      if (!this.edit) {
        const taskList = this.taskService.tasksList$.getValue();
        const task: Task = new Task(
          !taskList.length ? 1 : taskList.length + 1,
          this.form.value.name,
          this.form.value.description,
          TaskStatusEnum.todo,
          +this.form.value.assigny,
          ''+new Date()
        )
        
        this.taskService.createTask(task);
      } else {
        this.taskService.editTask(this.task.id,
          {
            name: this.form.value.name,
            description: this.form.value.description, 
            assigny: +this.form.value.assigny, 
            createData: this.task.createData,
            updateDate: ''+new Date()
         }
        );
      }
      
      this.form.reset();
      this.modalService.close();
      this.error = "";

    } else {
      this.error = "All fields are required";
    }
  }

  stop(event: MouseEvent) {
    event.stopPropagation();
  }
}
