import { Component, OnInit, NgModule } from '@angular/core';
import {Hero} from '../heros';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  selectedTodo: Todo;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
        .subscribe(todos => this.todos = todos);
  }
  add(name: string): void {
    // name = name.trim();
    // if (!name) { return; }
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }
  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
  }
 
}
