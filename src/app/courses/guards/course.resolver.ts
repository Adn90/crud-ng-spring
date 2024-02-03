import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../service/courses.service';
import { ICourse } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<ICourse> {

  constructor(private coursesService: CoursesService) {}

  // ActivatedRouteSnapshot - is a route listener. Store route data
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourse> {
    if (route.params && route.params['id']) {
      console.log(state, 'resolver')
      return this.coursesService.loadById(route.params['id']); // edit form
    }
    return of({ _id: "", name: "", category: "", lessons: []  }); // new forms
  }
}
