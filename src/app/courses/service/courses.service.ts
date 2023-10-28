import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICourse } from '../model/course';


// injeção de dependência
@Injectable({
  providedIn: 'root' // disponível de forma global. Em root
})
export class CoursesService {

  // instância  da classe
  constructor(private httpClient: HttpClient) { }

  list(): ICourse[] {
    return [{ _id: '1', name: "Angular", category: "Front-end" }]
  }
}
