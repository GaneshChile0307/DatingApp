import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() userFromHomeComponent:any;
  @Output() cancelFromRegisterComponent = new EventEmitter();
  registerForm : FormGroup;
  validationErrors:string[]= [];

  constructor(private accountService :AccountService , private toastr : ToastrService ,
     private fb : FormBuilder , private router : Router) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo : string):ValidatorFn{

      return (control:AbstractControl) => {
        return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching : true}

      }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(respose => {
      this.router.navigateByUrl('/members')
     
    } , 
    error => { 
      this.validationErrors=error; 
    }   
    );
  }

  cancel(){
    // console.log("cancelled");
    this.cancelFromRegisterComponent.emit(false);
  }
}
