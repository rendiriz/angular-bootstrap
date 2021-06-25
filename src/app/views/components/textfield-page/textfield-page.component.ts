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
  selector: 'app-textfield-page',
  templateUrl: './textfield-page.component.html',
  styleUrls: ['./textfield-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeTextfield = `<div class="mb-3">
  <label class="form-label">Name</label>
  <input type="email" class="form-control" placeholder="Placeholder Name">
</div>
<div class="mb-0">
  <label class="form-label">Description</label>
  <textarea class="form-control" rows="3" placeholder="Placeholder Description"></textarea>
</div>`;

  codeSize = `<div class="mb-3">
  <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
</div>
<div class="mb-3">
  <input class="form-control" type="text" placeholder="Default input">
</div>
<div class="mb-0">
  <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
</div>`;

  codeDisabled = `<div class="mb-3">
  <input class="form-control" type="text" placeholder="Disabled input" disabled>
</div>
<div class="mb-0">
  <input class="form-control" type="text" placeholder="Disabled readonly input" disabled readonly>
</div>`;

  codeReadonly = `<input class="form-control" type="text" placeholder="Readonly input here..." readonly>`;

  codeGroup = `<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>`;

  codeGroupSearch = `<div class="input-group input-search left mb-3">
  <span class="input-group-text">
    <i class="fas fa-search"></i>
  </span>
  <input class="form-control" type="text" placeholder="Cari" />
</div>
<div class="input-group input-search right mb-3">
  <input class="form-control" type="text" placeholder="Cari" />
  <span class="input-group-text">
    <i class="fas fa-search"></i>
  </span>
</div>
<div class="input-group input-search-button right">
  <input class="form-control" type="text" placeholder="Cari" />
  <button class="btn btn-green" type="button">
    <i class="fas fa-search"></i>
  </button>
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
    this.translateService.get('seo.textfield-page').subscribe((trans) => {
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
