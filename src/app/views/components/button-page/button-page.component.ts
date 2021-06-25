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
  selector: 'app-button-page',
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeButton = `<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary ms-2">Secondary</button>
<button type="button" class="btn btn-success ms-2">Success</button>
<button type="button" class="btn btn-danger ms-2">Danger</button>
<button type="button" class="btn btn-warning ms-2">Warning</button>
<button type="button" class="btn btn-info ms-2">Info</button>
<button type="button" class="btn btn-link link-green text-decoration-none ms-2">Link</button>

<button type="button" class="btn btn-yellow">Yellow</button>
<button type="button" class="btn btn-green ms-2">Green</button>
<button type="button" class="btn btn-blue ms-2">Blue</button>
<button type="button" class="btn btn-pink ms-2">Pink</button>
<button type="button" class="btn btn-red ms-2">Red</button>
<button type="button" class="btn btn-purple ms-2">Purple</button>
<button type="button" class="btn btn-gray ms-2">Gray</button>
<button type="button" class="btn btn-blue-gray ms-2">Blue Gray</button>`;

  codeOutline = `<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary ms-2">Secondary</button>
<button type="button" class="btn btn-outline-success ms-2">Success</button>
<button type="button" class="btn btn-outline-danger ms-2">Danger</button>
<button type="button" class="btn btn-outline-warning ms-2">Warning</button>
<button type="button" class="btn btn-outline-info ms-2">Info</button>

<button type="button" class="btn btn-outline-yellow">Yellow</button>
<button type="button" class="btn btn-outline-green ms-2">Green</button>
<button type="button" class="btn btn-outline-blue ms-2">Blue</button>
<button type="button" class="btn btn-outline-pink ms-2">Pink</button>
<button type="button" class="btn btn-outline-red ms-2">Red</button>
<button type="button" class="btn btn-outline-purple ms-2">Purple</button>
<button type="button" class="btn btn-outline-gray ms-2">Gray</button>
<button type="button" class="btn btn-outline-blue-gray ms-2">Blue Gray</button>`;

  codeSize = `<button type="button" class="btn btn-lg btn-green">Green</button>
<button type="button" class="btn btn-green ms-2">Green</button>
<button type="button" class="btn btn-sm btn-green ms-2">Green</button>`;

  codeIcon = `<button type="button" class="btn btn-green">
  Green <i class="fas fa-user ms-2"></i>
</button>
<button type="button" class="btn btn-green ms-2">
  <i class="fas fa-user me-2"></i> Green
</button>`;

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
    this.translateService.get('seo.button-page').subscribe((trans) => {
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
