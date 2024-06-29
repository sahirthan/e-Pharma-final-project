import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  userList: User[] = [];
  users: EventEmitter<User[]> = new EventEmitter();
  isAdmin: EventEmitter<boolean> = new EventEmitter();
  isLoggedIn: EventEmitter<boolean> = new EventEmitter();
  isUser: EventEmitter<boolean> = new EventEmitter();

  async getUsers(): Promise<Observable<User[]>> {
    this.httpClient.get<User[]>('http://localhost:8082/users').subscribe(data => {
      this.users.emit(data);
    })

    return this.users;
  }

  async addUser(user: User) {
    this.httpClient.post('http://localhost:8082/users', {
      "email": user.email,
      "location": user.location,
      "name": user.name,
      "password": user.password,
      "tp": user.tp,
      "username": user.username,
    }).subscribe(data => {
      console.log(data);
    });
  }

  

  logOut(){
    localStorage.clear();
    this.isAdmin.emit(false);
    this.isLoggedIn.emit(false);
    this.isUser.emit(false);
 }
}
