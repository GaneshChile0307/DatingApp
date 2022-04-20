import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any={};
  // @Input() userFromHomeComponent:any;
  @Output() cancelFromRegisterComponent = new EventEmitter();

  constructor(private accountService :AccountService) { }

  ngOnInit(): void {
  }

  register(){
    
    this.accountService.register(this.model).subscribe(respose => {
      console.log(respose);
      this.cancel();
    } , error => console.log(error));
  }

  cancel(){
    // console.log("cancelled");
    this.cancelFromRegisterComponent.emit(false);
  }
}
