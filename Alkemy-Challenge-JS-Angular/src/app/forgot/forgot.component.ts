import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  show: boolean;
  responseOk: string;
  responseError: string;
  restPasswordForm: FormGroup;
  sendEmail: boolean;

  constructor(private restFullApi: ApiService, private routing: Router) {

    this.show = false;
    this.responseOk, this.responseError = "";
    this.sendEmail = false;

    this.restPasswordForm = new FormGroup({

      email: new FormControl('', [
        Validators.required
      ])
    });
   }

   async onSubmit(){

     let email = {
       email: this.restPasswordForm.value.email.trim()
     }

      await this.restFullApi.forgotPassword(email).then(
         res => {
        this.sendEmail = true;
        this.responseOk = res.message;
        setTimeout(async () => {
          this.routing.navigate(["/"]);
        }, 5000);
      }).catch(err => {
          this.responseError= `Error: ${err.statusText}`;
          this.resetResponse();
      });
    }


  resetResponse(){
    setTimeout(async () => {
      this.responseOk, this.responseError = "";

    }, 3000);
  }

  ngOnInit(){
  }

}
