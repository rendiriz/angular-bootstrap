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

// SERVICE
import { GlobalService } from '@services';

// PACKAGE
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeTabs = `<ul ngbNav #navTabs="ngbNav" class="nav-tabs">
  <li ngbNavItem>
    <a ngbNavLink>First</a>
    <ng-template ngbNavContent>First content</ng-template>
  </li>
  <li ngbNavItem>
    <a ngbNavLink>Second</a>
    <ng-template ngbNavContent>Second content</ng-template>
  </li>
</ul>
<div [ngbNavOutlet]="navTabs"></div>`;

  codePills = `<ul ngbNav #navPills="ngbNav" class="nav-pills">
  <li ngbNavItem>
    <a ngbNavLink>First</a>
    <ng-template ngbNavContent>First content</ng-template>
  </li>
  <li ngbNavItem>
    <a ngbNavLink>Second</a>
    <ng-template ngbNavContent>Second content</ng-template>
  </li>
</ul>
<div [ngbNavOutlet]="navPills"></div>`;

  codeContainer = `<ul ngbNav #navContainer="ngbNav" class="nav-container">
  <li ngbNavItem>
    <a ngbNavLink>First</a>
    <ng-template ngbNavContent>First content</ng-template>
  </li>
  <li ngbNavItem>
    <a ngbNavLink>Second</a>
    <ng-template ngbNavContent>Second content</ng-template>
  </li>
</ul>
<div [ngbNavOutlet]="navContainer"></div>`;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {
    this.settingsAll();

    this.translateService.onLangChange.subscribe((event) => {
      this.settingsAll();
    });
  }

  settingsAll(): void {
    this.translateService.get('seo.tabs-page').subscribe((trans) => {
      this.label = trans.title;
      this.description = trans.description;

      // Title & Description
      this.title = this.globalService.title;
      this.titleService.setTitle(this.label);
      this.globalService.changeLabel(this.label);
      this.globalService.changeDescription(this.description);
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
