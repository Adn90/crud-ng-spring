import { Component, OnInit } from '@angular/core';
import { ICourse } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: ICourse[] = [{ _id: '1', name: "Angular", category: "Front-end" }];
  displayedColumns = ["name", "category"]

  constructor() { }

  ngOnInit(): void {
  }

}
