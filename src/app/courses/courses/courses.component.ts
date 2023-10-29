import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ICourse } from '../model/course';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<ICourse[]> = of([]);
  displayedColumns = ["name", "category"]

  // só é possível pois o CoursesService é @Injectable
  constructor(
    private courseService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.carregarTabela(); 
  }

  async carregarTabela() {
    this.courses$ = this.courseService.list();
  }

}
