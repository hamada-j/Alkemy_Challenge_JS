import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
//import { shortUrl } from './model/shortUrl';
import { environment } from "../environments/environment";
import { Movements } from "./models/Movemnts";




const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class ApiService {
  baseUrl = BACKEND_URL;


  constructor(private httpClient: HttpClient) {}

  getAllMovement(userId: string): Promise<Movements[]> {
    return this.httpClient.get<Movements[]>(`${this.baseUrl}/all_movement/${userId}`,this.createHeaders()).toPromise();
  }

  getMovement(idMovement: string): Promise<Movements> {
    return this.httpClient.get<Movements>(`${this.baseUrl}/one_movement/${idMovement}`, this.createHeaders()).toPromise();
  }

  createMovement(formValues: object): Promise<Movements> {
    return this.httpClient.post<Movements>(`${this.baseUrl}/post_movement`, formValues, this.createHeaders()).toPromise();
  }

  updateMovement(formValues: object, id: string): Promise<Movements> {
    return this.httpClient.patch<Movements>(`${this.baseUrl}/update_movement/${id}`, formValues, this.createHeaders()).toPromise();
  }

  deleteUrl(id: string): Promise<Movements> {
    return this.httpClient.delete<Movements>(`${this.baseUrl}/delete_one_movement/${id}`, this.createHeaders()).toPromise();
  }




  register(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/register`, formValues).toPromise();
  }
  loginWithEmail(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login_with_email`, formValues).toPromise();
  }
  loginWithUsername(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login_with_username`, formValues).toPromise();
  }

  forgotPassword(formValues): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/forgot`, formValues).toPromise();
  }


  createHeaders() {
    return {
      headers: new HttpHeaders({
        'token': localStorage.getItem("token")
      })
    };
  }



}
