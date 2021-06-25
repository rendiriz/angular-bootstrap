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
  selector: 'app-dropdown-menu-page',
  templateUrl: './dropdown-menu-page.component.html',
  styleUrls: ['./dropdown-menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeButton = `<div ngbDropdown class="dropdown mb-3">
  <button ngbDropdownToggle class="btn btn-green" type="button">
    Dropdown link <i class="fas fa-caret-down ms-2"></i>
  </button>
  <ul ngbDropdownMenu class="dropdown-menu">
    <li ngbDropdownItem>
      <a class="text-gray-800 text-decoration-none px-0" href="#">Action</a>
    </li>
    <li ngbDropdownItem>
      <a class="text-gray-800 text-decoration-none px-0" href="#">Another action</a>
    </li>
    <li ngbDropdownItem>
      <a class="text-gray-800 text-decoration-none px-0" href="#">Something else here</a>
    </li>
  </ul>
</div>`;

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
    this.translateService.get('seo.dropdown-menu-page').subscribe((trans) => {
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
