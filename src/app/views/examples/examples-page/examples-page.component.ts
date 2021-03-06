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
import { GlobalService, SidebarService } from '@services';

// PACKAGE
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-examples-page',
  templateUrl: './examples-page.component.html',
  styleUrls: ['./examples-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  menu!: any[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private globalService: GlobalService,
    private sidebarService: SidebarService,
    private translateService: TranslateService
  ) {
    this.settingsAll();

    this.translateService.onLangChange.subscribe((event) => {
      this.settingsAll();
    });
  }

  settingsAll(): void {
    this.translateService.get('seo.examples-page').subscribe((trans) => {
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
    this.menu = this.sidebarService.getExamples();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
