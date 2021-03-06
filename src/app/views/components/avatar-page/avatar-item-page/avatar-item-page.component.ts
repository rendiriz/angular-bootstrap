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
  selector: 'app-avatar-item-page',
  templateUrl: './avatar-item-page.component.html',
  styleUrls: ['./avatar-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarItemPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeDefaultWC = `<rendikit-avatar-item
  primaryText="Mike Cannon-Brookes"
  secondaryText="CEO@angular-bootstrap.com"
  avatar="<rendikit-avatar size='48' />">
</rendikit-avatar-item>`;

  codePrimary = `<app-comp-avatar-item
  primaryText="Mike Cannon-Brookes"
  [avatar]="{
    appearance: 'circle',
    size: 46,
    src: 'assets/images/user-img.jpeg'
  }">
</app-comp-avatar-item>`;

  codeSecondary = `<app-comp-avatar-item
  secondaryText="CEO@angular-bootstrap.com"
  [avatar]="{
    appearance: 'circle',
    size: 46,
    src: 'assets/images/user-img.jpeg'
  }">
</app-comp-avatar-item>`;

  codeComposing = `<app-comp-avatar-item
  primaryText="Mike Cannon-Brookes"
  secondaryText="CEO@angular-bootstrap.com"
  [avatar]="{
    appearance: 'circle',
    size: 46,
    src: 'assets/images/user-img.jpeg'
  }">
</app-comp-avatar-item>`;

  codeTruncation = `<app-comp-avatar-item
  primaryText="Mike Cannon-Brookes"
  secondaryText="CEO@angular-bootstrap.com"
  [isTruncation]="true"
  [avatar]="{
    appearance: 'circle',
    size: 46,
    src: 'assets/images/user-img.jpeg'
  }">
</app-comp-avatar-item>`;

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
    this.translateService.get('seo.avatar-item-page').subscribe((trans) => {
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
