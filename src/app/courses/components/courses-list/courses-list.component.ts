import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: ICourse[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showAdd: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;
  @Input() set showActions(indicator: boolean) {
    if (indicator) {
      this.displayedColumns.push('action');
      let uniq = [...new Set(this.displayedColumns)];
      this.displayedColumns = []
      this.displayedColumns = uniq;
    }
  };
  
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  constructor(
    // private router: Router,
    // private activatedRoute: ActivatedRoute, // referência da rota atual
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    // this.router.navigate(['new'], { relativeTo: this.activatedRoute });
    this.add.emit(true);
  }

  onEdit(course: ICourse) {
    this.edit.emit(course);
  }

}
