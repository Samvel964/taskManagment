import { Injectable } from "@angular/core";
import { UserStatusEnam } from "./auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor() {}

  users: User[] = [
    {
      id: 0,
      name: 'Ruben',
      lastName: 'Meschian',
      status: UserStatusEnam.pm
    },
    {
      id: 1,
      name: 'Developer1',
      lastName: 'Programming',
      status: UserStatusEnam.dev
    },
    {
      id: 2,
      name: 'Developer2',
      lastName: 'Programming',
      status: UserStatusEnam.dev
    },
    {
      id: 3,
      name: 'Developer3',
      lastName: 'Programming',
      status: UserStatusEnam.dev
    },
    {
      id: 4,
      name: 'Quality',
      lastName: 'Assurance',
      status: UserStatusEnam.QA
    }
  ]

  currentUser$ = new BehaviorSubject<User | null>(null);

  checkCurrentUser(): Observable<any> {
    const user = this.users.find(user => user.name === localStorage.getItem('login'));
    this.currentUser$.next(user!);
    return this.currentUser$;
  }
}