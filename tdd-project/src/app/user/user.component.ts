import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  user: {name: string};
  isLoggedIn = false;
  data: string;

  constructor(
    private userService: UserService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.user = this.userService.GetUser();
    this.dataService.GetDetails().then((data: string) => this.data = data)
  }

}
