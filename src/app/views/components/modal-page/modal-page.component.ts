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

// COMPONENT
import { ModalExampleComponent } from './modal-example/modal-example.component';

// PACKAGE
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  codeBreadcrumb = `<div class="modal-header">
  <h4 class="modal-title">Hi there!</h4>
  <button type="button"
          class="btn-close"
          aria-label="Close"
          (click)="dismiss('Cross click')">
  </button>
</div>
<div class="modal-body">
  <p>Hello, Modal!</p>
</div>
<div class="modal-footer">
  <button ngbAutofocus
          type="button"
          class="btn btn-danger"
          (click)="close('Close click')">Close</button>
</div>`;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private modalService: NgbModal
  ) {
    this.settingsAll();

    this.translateService.onLangChange.subscribe((event) => {
      this.settingsAll();
    });
  }

  settingsAll(): void {
    this.translateService.get('seo.modal-page').subscribe((trans) => {
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

  open() {
    this.modalService.open(ModalExampleComponent);
  }
}
