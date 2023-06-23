import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Respond } from '../interface/respond.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private readonly apiUrl: string ='https://randomuser.me/api/';

  constructor(private http:HttpClient) { }

  //fetch user
  getUsers(size: number = 10): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`).pipe(
      map((respond: Respond) => this.processRespond(respond)));
  }

// fetch one user using the user UUID
  getUser(uuid: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map((respond: Respond) => this.processRespond(respond)));
  }

  private processRespond(respond: Respond):Respond{
    return{
      info:{...respond.info},
      results: respond.results.map((user:any) => (<User>{
        uuid:user.login.uuid,
        firstName:user.name.first,
        lastName:user.name.last,
        email:user.email,
        username: user.login.username,
        gender:user.gender,
        address:`${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth:user.dob.date,
        phone:user.phone,
        imageUrl:user.picture.medium,
        coordinate:{latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude}
      }))
    };
  }
}
