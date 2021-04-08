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
      username: new FormControl('', [
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
        }, 5000);
    }

  }


  async onSubmitLogin() {

    let formValues = this.formValuesTrim(this.loginForm.value)

    console.log(formValues);

    if (formValues.email !== ""){
      await this.restFullApi.loginWithEmail(formValues).then(async res => {
        this.localStorageItems("login", res)
    }).catch(err => {
          this.responseError = `Error in your login: ${err.statusText}`;
          this.resetResponse();
      });
    } else {
      await this.restFullApi.loginWithUsername(formValues).then(async res => {
        this.localStorageItems("login", res)
       }).catch(err => {
          this.responseError = `Error in your login: ${err.statusText}`;
          this.resetResponse();
      });
    }

  }



  async onSubmitRegister() {
    let formValues = this.formValuesTrim(this.registerForm.value);
    await this.restFullApi.register(formValues).then(async res => {
      if (res.affectedRows === 1 && res.insertId !== 0){
        await this.restFullApi.loginWithEmail({
          email: formValues.email,
          password: formValues.password}).then(async res => {
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

  formValuesTrim(inputs){
    let formValues = {
      username: inputs.username.trim(),
      email: inputs.email.trim(),
      password: inputs.password.trim()
    }
    return formValues;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLand = false;
    }, 1500);

  }

}
