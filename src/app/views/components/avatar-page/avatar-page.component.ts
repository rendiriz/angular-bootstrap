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
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-avatar-page',
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeDefault = `<app-comp-avatar></app-comp-avatar>`;

  codeDefaultWC = `<rendikit-avatar></rendikit-avatar>`;

  codeCircle = `<app-comp-avatar
  appearance="circle"
  src="assets/images/user-img.jpeg">
</app-comp-avatar>`;

  codeSquare = `<app-comp-avatar
  appearance="square"
  src="https://www.searchpng.com/wp-content/uploads/2019/01/Rocket-Icon-PNG-715x715.png">
</app-comp-avatar>`;

  codeSize = `<app-comp-avatar
  appearance="circle"
  src="assets/images/user-img.jpeg"
  [size]="64">
</app-comp-avatar>`;

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
    this.translateService.get('seo.avatar-page').subscribe((trans) => {
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
