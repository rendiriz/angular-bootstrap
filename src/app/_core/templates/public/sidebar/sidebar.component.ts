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
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// SERVICE
import { GlobalService, SidebarService } from '@services';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-public-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  public isMenuCollapsed = true;

  title!: string;
  titleEmitter$ = new BehaviorSubject<string>(this.title);

  menu!: any[];
  menuEmitter$ = new BehaviorSubject<any[]>(this.menu);

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private sidebarService: SidebarService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService
  ) {
    this.globalService.currentSidebar.subscribe((current) => {
      this.title = current;
      this.titleEmitter$.next(current);
    });

    this.sidebarService.currentSidebar.subscribe((current) => {
      this.menu = current;
      this.menuEmitter$.next(current);
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
