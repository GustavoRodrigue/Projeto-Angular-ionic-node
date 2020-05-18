import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private messageService: MessageService) { }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(
            'api/auth', { username: username, password: password })
            .pipe(
                tap(_ => this.log(`login`)),
                catchError(this.handleError<any>(`Toke Error`)),
                map(result => {
                    localStorage.setItem('access_token', result.token);
                    return true;
                })

            );
    }
    logout() {
        localStorage.removeItem('access_token');
    }
    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') != null);
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}