import { Component,OnInit } from '@angular/core';
import { Respond } from 'src/app/interface/respond.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {
  respond: Respond;

constructor(private userService: UserService) {}

  ngOnInit(): void {
  this.userService.getUsers(15).subscribe(
    (results:any)=>{
      console.log(results);
      this.respond = results;
    }
  );
  }

}
