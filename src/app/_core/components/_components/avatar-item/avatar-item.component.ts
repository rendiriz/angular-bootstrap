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
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

// SERVICE
import { GlobalService } from '@services';
import { AvatarItemService } from './avatar-item.service';

// COMPONENT
import { AvatarComponent } from '@components/_components/avatar/avatar.component';

// PACKAGE
import isNil from 'lodash/isNil';
import assign from 'lodash/assign';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { css } from '@emotion/css';

@Component({
  selector: 'app-comp-avatar-item',
  templateUrl: './avatar-item.component.html',
  styleUrls: ['./avatar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AvatarItemService],
})
export class AvatarItemComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  @ViewChild('dynamicComponent', { static: true, read: ViewContainerRef }) myRef!: ViewContainerRef;

  className!: any;
  @Input() avatar!: any;
  @Input() primaryText = '';
  @Input() secondaryText = '';
  @Input() isTruncation = false;
  defaultInputs$ = new BehaviorSubject<any>({
    avatar: null,
    primaryText: '',
    secondaryText: '',
    isTruncation: false,
  });

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private avatarItemService: AvatarItemService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.defaultInputs$.next({ ...this.defaultInputs$.getValue(), ...this.checkInputs() });
    this.className = this.avatarItemService.getDynamicStyle(this.defaultInputs$.getValue());

    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputs = Object.keys(changes).reduce((result: any, item: any) => {
      result[item] = changes[item].currentValue;
      return result;
    }, {});

    this.defaultInputs$.next({ ...this.defaultInputs$.getValue(), ...inputs });
    this.className = this.avatarItemService.getDynamicStyle(this.defaultInputs$.getValue());
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  checkInputs(): any {
    const inputs = {};

    if (!isNil(this.avatar)) {
      assign(inputs, { avatar: this.avatar });
    }

    if (!isNil(this.primaryText)) {
      assign(inputs, { primaryText: this.primaryText });
    }

    if (!isNil(this.secondaryText)) {
      assign(inputs, { secondaryText: this.secondaryText });
    }

    if (!isNil(this.isTruncation)) {
      assign(inputs, { isTruncation: this.isTruncation });
    }

    return inputs;
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AvatarComponent);

    const componentRef = this.myRef.createComponent(componentFactory);

    this.defaultInputs$.subscribe((inputs) => {
      if (inputs.avatar.appearance) {
        componentRef.instance.appearance = inputs.avatar.appearance;
      }

      if (inputs.avatar.size) {
        componentRef.instance.size = inputs.avatar.size;
      }

      if (inputs.avatar.src) {
        componentRef.instance.src = inputs.avatar.src;
      }
    });

    componentRef.changeDetectorRef.detectChanges();
  }
}
