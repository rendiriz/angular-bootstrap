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
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  simpleItems: any[] = [];
  selectedSimpleItem = 1;

  dropdownItems: any[] = [];
  selectedDropdownItem = 1;

  longItems: any[] = [];
  selectedLongItem = 1;

  headerItems: any[] = [];
  selectedHeaderItem = 1;

  searchItems: any[] = [];
  selectedSearchItem = 1;

  radioItems: any[] = [];
  selectedRadioItem = 'Indonesia';

  multiItems: any[] = [];
  selectedMultiItem = [1, 2];

  multiMoreItems: any[] = [];
  selectedMultiMoreItem = [1, 2, 3, 4];

  multiGroupItems: any[] = [];
  selectedMultiGroupItem = [1, 2, 3, 4];

  multiCheckboxItems: any[] = [];
  selectedMultiCheckboxItem = [1, 2, 3, 4];

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
    this.translateService.get('seo.select-page').subscribe((trans) => {
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
    const option = [
      { value: 1, label: 'Indonesia' },
      { value: 2, label: 'Inggris' },
      { value: 3, label: 'Amerika' },
      { value: 4, label: 'Rusia' },
      { value: 5, label: 'Korea Utara' },
      { value: 6, label: 'Korea Selatan' },
      { value: 7, label: 'Malaysia' },
      { value: 8, label: 'Singapura' },
      { value: 9, label: 'Australia' },
      { value: 10, label: 'Gabon' },
      { value: 11, label: 'Jerman' },
      { value: 12, label: 'Portugal' },
      { value: 13, label: 'Rumania' },
      { value: 14, label: 'Selandia Baru' },
      { value: 15, label: 'Myanmar' },
      {
        value: 16,
        label:
          'Synergistically procrastinate distributed infrastructures for mission-critical expertise. Appropriately customize innovative innovation with resource sucking portals. Interactively customize diverse products for strategic applications.',
      },
    ];

    this.simpleItems = option;
    this.dropdownItems = option;
    this.longItems = option;
    this.headerItems = option;
    this.searchItems = option;

    const optionRadio = [
      { value: 'Indonesia', label: 'Indonesia' },
      { value: 'Inggris', label: 'Inggris' },
    ];
    this.radioItems = optionRadio;

    this.multiItems = option;
    this.multiMoreItems = option;
    this.multiGroupItems = option;
    this.multiCheckboxItems = option;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
