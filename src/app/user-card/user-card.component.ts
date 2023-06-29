import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../user.entity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  @Input() user: any;
  @Output() remove = new EventEmitter<User>();

  currentTitle!: string;
  currentValue!: any;

  constructor() {}

  ngOnInit(): void {
    this.currentTitle = 'Hi, my name is';
    this.currentValue = `${this.user.name.title}  ${this.user.name.first} ${this.user.name.last}`;
  }

  trigger(event: Event, buttonParent: HTMLElement) {
    let target = event.target as HTMLButtonElement;
    let buttons = buttonParent.children;

    if (target.className === 'btn-info')
      target.className = target.className + ' active';

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].className !== 'btn-info' && buttons[i].id !== target.id)
        buttons[i].className = 'btn-info';
    }

    let id = target.id;

    if (id === 'name') {
      this.currentTitle = 'Hi, my name is';
      this.currentValue = `${this.user.name.title}.  ${this.user.name.first} ${this.user.name.last}`;
    } else if (id === 'mail') {
      this.currentTitle = 'My email address is';
      this.currentValue = this.user.email;
    } else if (id === 'birthday') {
      this.currentTitle = 'My birthday is';
      let bday = new Date(this.user.dob.date);
      this.currentValue = `${bday.getMonth()}/${bday.getDay()}/${bday.getFullYear()}`; //this.formatDate(this.user.dob.date);
    } else if (id === 'address') {
      this.currentTitle = 'My address is';
      this.currentValue = `${this.user.location.street.number} ${this.user.location.street.name}`;
    } else if (id === 'phone') {
      this.currentTitle = 'My phone number is';
      this.currentValue = this.user.phone;
    } else if (id === 'password') {
      this.currentTitle = 'My password is';
      this.currentValue = this.user.login.password;
    }
  }

  deleteUser(user: User) {
    this.remove.emit(user);
  }
}
