import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Input,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// SERVICE
import { GlobalService } from '@services';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-comp-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  @Input() appearance!: string;
  @Input() size = 32;
  @Input() src = '';

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
