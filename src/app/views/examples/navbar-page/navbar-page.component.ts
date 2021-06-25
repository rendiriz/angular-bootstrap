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
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  styleUrls: ['./navbar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  public isMenuCollapsed = true;

  codeNavbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand"
       [routerLink]="['/' | localize]">
      Navbar
    </a>
    <div>
      <button class="toggler-navbar btn btn-outline-gray-800"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              (click)="isMenuCollapsed = !isMenuCollapsed">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div [ngbCollapse]="isMenuCollapsed"
         class="collapse navbar-collapse"
         id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="[]"
             (click)="isMenuCollapsed = true">
            Link
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['/examples' | localize]"
             (click)="isMenuCollapsed = true">
            {{ 'examples' | translate }}
          </a>
        </li>
        <li ngbDropdown
            class="nav-item dropdown">
          <a ngbDropdownToggle
             class="nav-link"
             [routerLink]="[]">
            Dropdown <i class="fas fa-caret-down ms-2"></i>
          </a>
          <ul ngbDropdownMenu
              class="dropdown-menu">
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Action</a>
            </li>
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Another action</a>
            </li>
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Something else here</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav d-flex">
        <li ngbDropdown
            class="nav-item dropdown">
          <a ngbDropdownToggle
             class="nav-link d-flex align-items-center"
             [routerLink]="[]">
            <app-comp-avatar-item primaryText="Mike Cannon-Brookes"
                                  [avatar]="{ appearance: 'circle', src: 'assets/images/user-img.jpeg' }">
            </app-comp-avatar-item>
            <i class="fas fa-caret-down ms-2"></i>
          </a>
          <ul ngbDropdownMenu
              class="dropdown-menu end-0">
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Action</a>
            </li>
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Another action</a>
            </li>
            <li ngbDropdownItem>
              <a class="d-block text-gray-800 text-decoration-none px-0"
                 href="#">Something else here</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

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
    this.translateService.get('seo.navbar-page').subscribe((trans) => {
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
