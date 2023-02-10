import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
export enum UserStatusEnam {
  pm = 'pm',
  dev = 'dev',
  QA = 'QA'
}
export interface UserData {
  userName: string
  password: string
}

const usersMap = new Map();
usersMap.set('pm.pm','pm.pm');
usersMap.set('dev1.dev1','dev1.dev1');
usersMap.set('dev2.dev2','dev2.dev2');
usersMap.set('dev3.dev3','dev3.dev3');
usersMap.set('qa.qa','qa.qa');


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isAuthenticated() {
    return localStorage.getItem('login');
  }

  logIn(data: UserData): Observable<void> {
    return new Observable((observer) => {
      if (usersMap.get(data.userName) === data.password) {
        this.setCurrentUserData(data)
        observer.next();
        observer.complete();
      } else {
        observer.error('Wrong login or password');
      }
    })
  }

  logOut() {
    localStorage.removeItem('login');
  }  

  private setCurrentUserData(data: UserData) {
    switch(data.userName) {
      case 'pm.pm':
        localStorage.setItem('login', 'Ruben');
        break
      case 'dev1.dev1':
        localStorage.setItem('login', 'Developer1');
        break
      case 'dev2.dev2':
        localStorage.setItem('login', 'Developer2');
        break
      case 'dev3.dev3':
        localStorage.setItem('login', 'Developer3');
        break
      case 'qa.qa':
        localStorage.setItem('login', 'Quality');
        break
    }
  }
}
