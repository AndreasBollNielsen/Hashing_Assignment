import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginSubject$: Subject<boolean> = new Subject<boolean>();
  constructor(private api:ApiService) { }

  //method to app api for login
  Login(userData: any): Observable<boolean> {

    console.log("auth: ",userData);
    this.api.Login(userData).subscribe(data =>{
      console.log(data);
      this.loginSubject$.next(true);
    })
    return this.loginSubject$.asObservable();
  }
}
