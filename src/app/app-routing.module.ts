import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'board', component: BoardComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
