import { I18nPluralPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  page: number = 1;

  @Input()
  pageSize: number = 12;

  @Input()
  collectionSize: number = 0;

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter();

  pages: number[] = []
  admin: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.collectionSize / this.pageSize); i++) {
      this.pages.push(i);
    }
  }

  onPageChanged(newPage: number) {
    this.pageChanged.emit(newPage);
  }

}
