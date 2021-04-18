import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  userId: string
  username: string;
  email: string;
  password: string;

  response: string;

  constructor() {
    this.userId = "";
    this.username = 'sssss'
    this.email = 'www'
    this.password = "llllll"
    this.response = "";
  }




  formValuesTrim(inputs){
    let formValues = {
      username: inputs.username.trim(),
      email: inputs.email.trim(),
      password: inputs.password.trim()
    }
    return formValues;
  }
  resetResponse(){
    setTimeout(async () => {
      this.response = ""
    }, 3000);
  }

  ngOnInit(): void {

    this.userId = localStorage.getItem("userId");
  }

}
