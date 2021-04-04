import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';


import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(0%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(0%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usernameOrEmail: boolean;
  showLand: boolean;
  temporalLogin: boolean;

  responseError: String;

  @ViewChild("myContainer") Container: any;
  @ViewChild('myContainer') private draggableElement: ElementRef;

  loginForm: FormGroup;
  registerForm: FormGroup;



  constructor(private restFullApi: ApiService, private routing: Router) {

    this.showLand = true;
    this.usernameOrEmail = false;
    this.responseError = "";
    this.temporalLogin = false;

    this.loginForm = new FormGroup({
      email: new FormControl('', [

      ]),
      username: new FormControl('', [

      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.registerForm =new FormGroup({
      usuario: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

   }




  handleClickSignIn(){
    this.Container.nativeElement.classList.remove("right-panel-active");
  }

  handleClickSignUp(){
    this.Container.nativeElement.classList.add("right-panel-active");
  }


  localStorageItems(option: string, response: object) {

    localStorage.setItem("userId", response["id"]);
    localStorage.setItem("token", response["success"]);
    localStorage.setItem("token_since", new Date().toString());

    if (option === "login"){
    this.routing.navigate(["/movement"]);
    }else{
      this.draggableElement.nativeElement.remove();
      this.temporalLogin = true;
      setTimeout(() => {
          this.temporalLogin = false;
          this.routing.navigate(["/movement"]);
        }, 20000);
    }

  }


  async onSubmitLogin() {

    if (this.loginForm.value.email !== ""){
      await this.restFullApi.login(this.loginForm.value).then(async res => {
        console.log(res)
        this.localStorageItems("login", res)
    }).catch(err => {
          this.responseError = `Error in your login: ${err.statusText}`;
          this.resetResponse();
      });
    } else {
      console.log('here is name')
    }

  }

  async onSubmitRegister() {
    await this.restFullApi.register(this.registerForm.value).then(async res => {
      if (res.affectedRows === 1 && res.insertId !== 0){
        await this.restFullApi.login({
          email: this.registerForm.value.email,
          password: this.registerForm.value.password}).then(async res => {
        console.log(res)
        this.localStorageItems("register", res)
        // send email with link
        }).catch(err => {
          console.log(err)
        });
      }
    }).catch(err => {
        console.log(err)
        this.responseError = `Error in your register: ${err.statusText}`;
        this.resetResponse();
      });
  }

  handleClickUsernameOrEmail(){
    this.usernameOrEmail = !this.usernameOrEmail
  }

  resetResponse(){
    setTimeout(async () => {
      this.responseError = ""
    }, 3000);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLand = false;
    }, 1500);

  }

}
