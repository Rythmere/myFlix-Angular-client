import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl ='https://myflixbdg.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 constructor(private http: HttpClient) {
}
// Making the api call for the user registration endpoint
public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}


//making the api call for user login
public login(username: any, password: any): Observable<any> {
  return this.http.post(apiUrl + 'login', {username, password}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//making the api call to get all Movies
public getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to get one movie
public getMovie(title: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to get director details
public getDirector(name: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `directors/${name}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to get genre details
public getGenre(name: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `genres/${name}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to get user details
public getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to get users favourites
public getFavourites(movieID: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/${username}/movies${movieID}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call for adding movie to favourites
public addFavourite(movieID: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/${username}/movies${movieID}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call for removing movie from favourites
public removeFavourite(movieID: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}/movies${movieID}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call for updating users account
public updateUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${username}`, { userDetails, headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//making the api call to delete users account
public deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}


private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
  console.error('Some error occurred:', error.error.message);
  } else {
  console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(
  'Something bad happened; please try again later.');
}
}
