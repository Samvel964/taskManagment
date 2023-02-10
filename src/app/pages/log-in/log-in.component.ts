import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form!: FormGroup
  error: string = ""
  unSub$!: Subscription 
  

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.valid) {
      this.unSub$ = this.authService.logIn(this.form.value).subscribe(() => {
        this.error = "";
        this.router.navigate(['board']);
        this.form.reset();
      }, error => this.error = error);
    }
  }

  ngOnDestroy(): void {
    if(this.unSub$) {
      this.unSub$.unsubscribe();
    } 
  }
}
