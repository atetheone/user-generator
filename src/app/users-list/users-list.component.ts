import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent implements OnInit {
  private _users: User[] = [];

  orderByBirthday: 'none' | 'asc' | 'desc' = 'none';
  searchValue: string = '';
  filter: 'all' | 'male' | 'female' = 'all';
  loading!: boolean;
  loadingGenerate: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (resp: User[]) => (this._users = resp),
      complete: () => (this.loading = false),
    });
  }

  get users(): User[] {
    this.searchValue = this.searchValue.toLowerCase();
    if (this.searchValue) {
      return this._users.filter((user: User) => {
        return (
          user.name.first.toLowerCase().startsWith(this.searchValue) ||
          user.name.last.toLowerCase().startsWith(this.searchValue)
        );
      });
    }
    if (this.filter === 'all') return this._users;
    return this._users.filter((user: User) => this.filter === user.gender);
  }

  sortByAge(): void {
    if (this.orderByBirthday === 'asc') {
      this._users.sort(
        (a: any, b: any) =>
          new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime()
      );
    } else if (this.orderByBirthday === 'desc') {
      this._users.sort(
        (a: any, b: any) =>
          -new Date(a.dob.date).getTime() + new Date(b.dob.date).getTime()
      );
    }
  }

  removeUser(user: User): void {
    this._users.splice(this._users.indexOf(user), 1);
  }

  generateNewUser(usersNumber: string): void {
    this.loadingGenerate = true;
    this.userService.getUsers(+usersNumber).subscribe({
      next: (resp: User[]) => {
        this._users = [...this._users, ...resp];
      },
      complete: () => (this.loadingGenerate = false),
    });
  }
}
