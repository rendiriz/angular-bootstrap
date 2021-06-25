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
  selector: 'app-tooltip-page',
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  code = `<button type="button" class="btn btn-outline-secondary" placement="top" ngbTooltip="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-outline-secondary ms-2" placement="right" ngbTooltip="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-outline-secondary ms-2" placement="bottom" ngbTooltip="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-outline-secondary ms-2" placement="left" ngbTooltip="Tooltip on left">
  Tooltip on left
</button>

<ng-template #tipContent>
  <strong>Tipe Download</strong> <br>
  Tipe file yang dapat didownload adalah: <br>
  - Excel <br>
  - CSV
</ng-template>
<button type="button"
        class="btn btn-outline-secondary"
        [ngbTooltip]="tipContent"
        [autoClose]="false"
        triggers="manual"
        #t="ngbTooltip"
        (click)="t.open()">
  Click me to open a tooltip & I've got markup and bindings in my tooltip!
</button>
<button type="button" class="btn btn-outline-secondary ms-2" (click)="t.close()">
  Click me to close a tooltip
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
    this.translateService.get('seo.tooltip-page').subscribe((trans) => {
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
