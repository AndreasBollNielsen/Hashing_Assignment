import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  //api call to add user to database
  AddUser(user: any): Observable<any[]> {
    return this.http.post<any[]>(`$http://localhost:3600/api/login/`,user);
  }


  //api call to validate login
  Login(data: any) {

    const username = data.userName;
    const password = data.passWord;
    console.log("api: ",data);

    //this portion should clearly be hashed or encrypted before being sent across the internet 
    return this.http.get<any>(`$http://localhost:3600/api/login/?` + `userName=${username}&passWord=${password}`);

  }
}
