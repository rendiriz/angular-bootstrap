import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// MODEL
import { NewsCategoryData } from '@models';

// SERVICE
import { GlobalService } from '@services';

// STORE
import {
  selectAllNewsCategory,
  selectIsLoadingList,
  selectIsLoadingUpdate,
  selectError,
  selectPagination,
} from '@store/news-category/news-category.selectors';
import { fromNewsCategoryActions } from '@store/news-category/news-category.actions';

// PACKAGE
import _ from 'lodash';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-ngrx-page',
  templateUrl: './ngrx-page.component.html',
  styleUrls: ['./ngrx-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  perPageItems: any[] = [];
  pageItems: any[] = [];

  // Data
  data$!: Observable<NewsCategoryData[]>;
  isLoadingList$!: Observable<boolean>;
  isLoadingUpdate$!: Observable<boolean>;
  isError$!: Observable<boolean>;
  isError = false;
  errorMessage!: string;
  pagination: any;
  pages: any;

  filter = {
    sort: 'newest',
    perPage: 10,
    currentPage: 1,
    search: '',
  };

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private actions$: Actions,
    private store: Store<any>
  ) {
    this.settingsAll();

    this.translateService.onLangChange.subscribe((event) => {
      this.settingsAll();
    });
  }

  settingsAll(): void {
    this.translateService.get('seo.ngrx-page').subscribe((trans) => {
      this.label = trans.title;
      this.description = trans.description;

      // Title & Description
      this.title = this.globalService.title;
      this.titleService.setTitle(this.label);
      this.globalService.changeLabel(this.label);
      this.globalService.changeDescription(this.description);
    });
  }

  ngOnInit(): void {
    const option = [
      { value: 10, label: '10' },
      { value: 25, label: '25' },
      { value: 100, label: '100' },
    ];

    this.perPageItems = option;

    this.getAllNewsCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  getAllNewsCategory(): void {
    let pSort: string;
    if (this.filter.sort === 'newest') {
      pSort = `modified_at:desc`;
    }

    const pCurrent =
      Number(this.filter.perPage) * Number(this.filter.currentPage) - Number(this.filter.perPage);

    const pWhere = {
      is_active: true,
    };

    const params = {
      search: this.filter.search || '',
      // sort: pSort,
      limit: this.filter.perPage,
      start: pCurrent,
      where: JSON.stringify(pWhere),
    };

    this.store.dispatch(
      fromNewsCategoryActions.loadAllNewsCategory({
        params,
        pagination: true,
        infinite: false,
      })
    );

    this.isLoadingList$ = this.store.pipe(select(selectIsLoadingList));

    this.store
      .pipe(
        select(selectPagination),
        filter((val) => val !== null)
      )
      .subscribe((result) => {
        this.pagination = result;

        if (!result.empty) {
          const options = [];
          for (let index = 1; index <= result.total_pages; index++) {
            options.push({ value: index, label: index.toString() });
          }
          this.pageItems = options;
        }
      });

    this.data$ = this.store.pipe(select(selectAllNewsCategory));
  }

  filterPerPage(event: any) {
    const value = _.isEmpty(event) === false ? event.value : null;

    this.filter.perPage = value;
    this.filter.currentPage = 1;
    this.getAllNewsCategory();
  }

  filterPage(event: any) {
    const value = _.isEmpty(event) === false ? event.value : null;

    this.filter.currentPage = value;
    this.getAllNewsCategory();
  }
}
