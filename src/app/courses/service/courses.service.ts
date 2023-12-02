import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, first, take, delay  } from 'rxjs/operators';

import { ICourse } from '../model/course';

// injeção de dependência
@Injectable({
  providedIn: 'root' // disponível de forma global. Em root
})
export class CoursesService {
  private readonly API = 'api/courses'; // link já configurando no proxy.config.js
  // instância  da classe
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<ICourse[]>(this.API)
    .pipe(
      delay(100),
      first(), // or take(1) // serve para fechar a conexão com server. Aqui, o server não é reativo /um stream de dados/ websocket
      tap(courses => console.log(courses)),
    )
  }

  save(course: ICourse) {
    return this.httpClient.post<ICourse>(this.API, course).pipe(
      first()
    );
  }

  loadById(id: string) {
    return this.httpClient.get<ICourse>(`${this.API}/${id}`);
  }
}