import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
//import { shortUrl } from './model/shortUrl';
import { environment } from "../environments/environment";




const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class ApiService {
  baseUrl = BACKEND_URL;
  http: any;
  constructor(private httpClient: HttpClient) {}

  getAllMovement(userId: string): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/all_movement/${userId}`).toPromise();
  }

  getMovement(idMovement: string): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/one_movement/${idMovement}`).toPromise();
  }

  createMovement(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/post_movement`, formValues).toPromise();
  }

  updateMovement(formValues: object, id: string): Promise<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/update_movement/${id}`, formValues).toPromise();
  }

  deleteUrl(id: string): Promise<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/delete_one_movement/${id}`).toPromise();
  }




  register(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/register`, formValues).toPromise();
  }

  login(formValues: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formValues).toPromise();
  }



}
