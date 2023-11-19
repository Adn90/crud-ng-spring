import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../model/course';

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
    if (!indicator) {
      let index = this.displayedColumns.indexOf("action");
      this.displayedColumns.splice(index, 1);    }
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, // referência da rota atual
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

}
