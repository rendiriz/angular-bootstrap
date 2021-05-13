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
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeCheckbox = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="Indonesia">
  <label class="form-check-label"> Indonesia </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="Inggris" checked>
  <label class="form-check-label"> Inggris </label>
</div>`;

  codeIndeterminate = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="">
  <label class="form-check-label">
    Indeterminate checkbox
  </label>
</div>`;

  codeDisabled = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="Indonesia" disabled>
  <label class="form-check-label"> Indonesia </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="Inggris" checked disabled>
  <label class="form-check-label"> Inggris </label>
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
    this.translateService.get('seo.checkbox-page').subscribe((trans) => {
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
