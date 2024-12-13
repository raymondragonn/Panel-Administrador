import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiLocal+'/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // existsUser(data:any){
  //   return this.http.get()
  // }

  login(email: string, password: string){
    return this.http.post( `${BASE_URL}/login`,{email,password})
  }

  signup(name: string, email: string, password: string, passwordConfirm: string){
    console.log(BASE_URL); 
    return this.http.post( `${BASE_URL}/signup`, {name,email,password,passwordConfirm})
  }
  
}
