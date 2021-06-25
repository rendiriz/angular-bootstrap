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
import { BehaviorSubject } from 'rxjs';

// SERVICE
import { GlobalService } from '@services';
import { AvatarService } from './avatar.service';

// PACKAGE
import isNil from 'lodash/isNil';
import assign from 'lodash/assign';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-comp-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AvatarService],
})
export class AvatarComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  className!: any;
  @Input() appearance!: string;
  @Input() size!: number;
  @Input() src!: string;
  defaultInputs$ = new BehaviorSubject<any>({
    appearance: 'circle',
    size: 32,
    src: '',
  });

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private avatarService: AvatarService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService
  ) {}

  ngOnInit(): void {
    this.defaultInputs$.next({ ...this.defaultInputs$.getValue(), ...this.checkInputs() });
    this.className = this.avatarService.getDynamicStyle(this.defaultInputs$.getValue());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputs = Object.keys(changes).reduce((result: any, item: any) => {
      result[item] = changes[item].currentValue;
      return result;
    }, {});

    this.defaultInputs$.next({ ...this.defaultInputs$.getValue(), ...inputs });
    this.className = this.avatarService.getDynamicStyle(this.defaultInputs$.getValue());
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  checkInputs(): any {
    const inputs = {};

    if (!isNil(this.appearance)) {
      assign(inputs, { appearance: this.appearance });
    }

    if (!isNil(this.size)) {
      assign(inputs, { size: this.size });
    }

    if (!isNil(this.src)) {
      assign(inputs, { src: this.src });
    }

    return inputs;
  }
}
