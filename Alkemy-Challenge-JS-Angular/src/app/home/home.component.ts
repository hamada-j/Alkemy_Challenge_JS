import { Component, OnInit, ViewChild } from '@angular/core';
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
  showToken: boolean;

  responseError: String;

  @ViewChild("myContainer") Container: any;

  loginForm: FormGroup;
  registerForm: FormGroup;



  constructor(private restFullApi: ApiService, private routing: Router) {

    this.showLand = true;
    this.showToken = false;
    this.usernameOrEmail = false;
    this.responseError = "";

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



  async onSubmitLogin() {

    if (this.loginForm.value.email !== ""){
      await this.restFullApi.login(this.loginForm.value).then(async res => {
        console.log(res)
        this.routing.navigate([`/movement`]);

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
        // send email with link

        this.showToken = true;
        setTimeout(() => {
          this.showToken = false;
          this.routing.navigate([`/`]);
        }, 3000);

        }).catch(err => {
          console.log(err)
          this.responseError = "error"
          console.log(err)});
      }
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
