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

// SERVICE
import { GlobalService } from '@services';

// COMPONENT
import { AvatarComponent } from '@components/_components/avatar/avatar.component';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-comp-avatar-item',
  templateUrl: './avatar-item.component.html',
  styleUrls: ['./avatar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarItemComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  @ViewChild('dynamicComponent', { static: true, read: ViewContainerRef }) myRef!: ViewContainerRef;

  @Input() avatar!: any;
  @Input() primaryText = '';
  @Input() secondaryText = '';
  @Input() isTruncation = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private localize: LocalizeRouterService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AvatarComponent);

    const componentRef = this.myRef.createComponent(componentFactory);

    if (this.avatar.appearance) {
      componentRef.instance.appearance = this.avatar.appearance;
    }

    if (this.avatar.size) {
      componentRef.instance.size = this.avatar.size;
    }

    if (this.avatar.src) {
      componentRef.instance.src = this.avatar.src;
    }

    componentRef.changeDetectorRef.detectChanges();
  }
}
