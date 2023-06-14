import { Injectable } from '@angular/core';
import { Users } from './user';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class usersService {
  private urlEndpoint: string =
    'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAllUsers() {
    let httpData = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get<any>(this.urlEndpoint, httpData)
    .pipe(
      catchError(this.handleError)
    );
  }
  getOneUser(id:string) {
    let httpData = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get<any>(this.urlEndpoint+`/${id}`, httpData)
    .pipe(
      catchError(this.handleError)
    );
  }
}
