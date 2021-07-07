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
import { environment } from 'src/environments/environment';

// SERVICE
import { GlobalService } from '@services/private';

// PACKAGE
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  public isMenuCollapsed = true;

  // Variable
  isMobileExpanded!: boolean;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService
  ) {
    this.globalService.currentToggleMobileExpanded.subscribe((current) => {
      this.isMobileExpanded = current;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  toggleMobileExpanded(): void {
    this.isMobileExpanded = !this.isMobileExpanded;
    this.globalService.changeToggleMobileExpanded(this.isMobileExpanded);
  }
}
