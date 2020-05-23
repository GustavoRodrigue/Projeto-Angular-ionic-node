import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private todosUrl = 'api/todos';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => this.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

//   getTodo(id: number): Observable<Todo> {
//     const url = `${this.todosUrl}/${id}`;
//     return this.http.get<Todo>(url).pipe(
//       tap(_ => this.log(`fetched Todo id=${id}`)),
//       catchError(this.handleError<Todo>(`getTodo id=${id}`))
//     );
//   }
//   /** PUT: update the Todo on the server */
//   updateTodo(Todo: Todo): Observable<any> {
//     return this.http.put(this.todosUrl, Todo, this.httpOptions).pipe(
//       tap(_ => this.log(`updated Todo id=${Todo.id}`)),
//       catchError(this.handleError<any>('updateTodo'))
//     );
//   }
//   /** POST: add a new Todo to the server */
//   addTodo(Todo: Todo): Observable<Todo> {
//     return this.http.post<Todo>(this.todosUrl, Todo, this.httpOptions).pipe(
//       tap((newTodo: Todo) => this.log(`added Todo w/ id=${newTodo.id}`)),
//       catchError(this.handleError<Todo>('addTodo'))
//     );
//   }
//   /** DELETE: delete the Todo from the server */
//   deleteTodo(Todo: Todo | number): Observable<Todo> {
//     const id = typeof Todo === 'number' ? Todo : Todo.id;
//     const url = `${this.todosUrl}/${id}`;

//     return this.http.delete<Todo>(url, this.httpOptions).pipe(
//       tap(_ => this.log(`deleted Todo id=${id}`)),
//       catchError(this.handleError<Todo>('deleteTodo'))
//     );
//   }
//   /* GET todos whose name contains search term */
//   searchtodos(term: string): Observable<Todo[]> {
//     if (!term.trim()) {
//       // if not search term, return empty Todo array.
//       return of([]);
//     }
//     return this.http.get<Todo[]>(`${this.todosUrl}/?name=${term}`).pipe(
//       tap(x => x.length ?
//         this.log(`found todos matching "${term}"`) :
//         this.log(`no todos matching "${term}"`)),
//       catchError(this.handleError<Todo[]>('searchtodos', []))
//     );
//   }

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
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
