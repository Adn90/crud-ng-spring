import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../service/courses.service';
import { ICourse } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup; // var!: type => ignores ready initialization
  titulo: string = "";

  disabledOnSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public formUtils: FormUtilsService // para utilizar no html
    ) {
  }

  ngOnInit(): void {
    this.titulo = "Detalhes do Curso";
    this.loadingData();
  }

  loadingData() {
    // get data from route
    // this.activatedRoute.snapshot.data['course'] - the ['course'] was defined in the resolver - routing file
    // with forms, its need to use setValue or patch
    const course: ICourse = this.activatedRoute.snapshot.data['course'];
    this.initializeForm(course);    
  }

  initializeForm(course: ICourse) {
    // resolver will return the data, empty or not
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name, [
          Validators.required, 
          Validators.minLength(5), 
          Validators.maxLength(100),
          Validators.pattern(/[\S]/g)] // whitespace
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retriveLesson(course), Validators.required)      
    });
  }

  onSubmit() {
    this.snackBar.dismiss();
    // if (!this.form.valid) {
    //   this.snackBar.open(`Campos não foram preenchidos!`, "", { duration: 3000 } );
    //   return;
    // } 
    if (this.form.valid) {
      this.courseService.save(this.form.value).subscribe(
        (data: ICourse) => { 
          this.onSucess(data);  
          this.disabledOnSubmit = true;
        }, 
        (error: HttpErrorResponse) => { this.onError(error); } 
      );
    } else {
      this.formUtils.validadteAllFormFields(this.form);
    }  
        
  }

  onCancel() { 
    this.snackBar.dismiss();
    this.location.back(); 
  }

  onError(error: HttpErrorResponse) {
    this.snackBar.open(error.message);
  }

  onSucess(data: ICourse) {
    this.snackBar.open(`Curso ${data.name} foi incluído com sucesso!`, "", { duration: 3000 } );
    setTimeout(() => {
      this.onCancel();
    }, 3000);    
    
  }

  checkEmpty(form: any) {
    // just use form.status
    for (var key in form) {
      if (key == '_id') { continue; } // ignore id.
      if (form[key] === null || form[key] == "")
        return true;
    }
    return false;
  }

  private createLesson(lesson: ILesson = { id: '', name: '', youtubeUrl: '' }): FormGroup { // valores padrão, caso lesson seja null
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100),
        Validators.pattern(/[\S]/g)]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(11),
        Validators.pattern(/[\S]/g)]],
    });
  }

  private retriveLesson(course: ICourse) {
    const lessons: FormGroup[] = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson()); // create new lesson
    }
    return lessons;
  }

  getLessonsFormArray() {
    // Property 'controls' does not exist on type 'AbstractControl'.
    // the cast makes ts undestand
    return (this.form.get('lessons') as FormArray).controls;
  }

  addNewLesson() {
    const lessons =  (this.form.get('lessons') as FormArray);
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons =  (this.form.get('lessons') as FormArray);
    lessons.removeAt(index);
  }

}