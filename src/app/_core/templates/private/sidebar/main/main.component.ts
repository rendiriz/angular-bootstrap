import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// SERVICE
import { GlobalService, SidebarService } from '@services/private';

@Component({
  selector: '[app-private-sidebar-main]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    class: 'sidebar sidebar-dark sidebar-main sidebar-expand-lg',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('navSidebar') navSidebarEl!: QueryList<ElementRef>;
  @ViewChildren('navItem') navItemEl!: QueryList<ElementRef>;

  isMainResized = false;
  isMainUnfold = false;

  isMobileExpanded!: boolean;

  menu!: any[];
  menuEmitter$ = new BehaviorSubject<any[]>(this.menu);

  constructor(private globalService: GlobalService, private sidebarService: SidebarService) {
    this.globalService.currentToggleMobileExpanded.subscribe((current) => {
      this.isMobileExpanded = current;
    });

    this.sidebarService.currentSidebar.subscribe((current) => {
      this.menu = current;
      this.menuEmitter$.next(current);
    });
  }

  @HostBinding('class') get class() {
    const classes: string[] = [];

    if (this.isMainResized) {
      classes.push('sidebar-main-resized');
    } else {
      classes.filter((e) => e !== 'sidebar-main-resized');
    }

    if (this.isMainUnfold) {
      classes.push('sidebar-main-unfold');
    } else {
      classes.filter((e) => e !== 'sidebar-main-unfold');
    }

    if (this.isMobileExpanded) {
      classes.push('sidebar-mobile-expanded');
    } else {
      classes.filter((e) => e !== 'sidebar-mobile-expanded');
    }

    return classes.join(' ');
  }

  onMouseEnter() {
    if (this.isMainResized) {
      this.isMainUnfold = true;
    } else {
      this.isMainUnfold = false;
    }
  }

  onMouseLeave() {
    this.isMainUnfold = false;
  }

  toggleMobileExpanded(): void {
    this.isMobileExpanded = !this.isMobileExpanded;
    this.globalService.changeToggleMobileExpanded(this.isMobileExpanded);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.navSidebarEl.forEach((sidebar) => {
      const main = sidebar.nativeElement.querySelectorAll('.nav-item');

      main.forEach((item: any) => {
        const group = item.querySelector('.nav-group-sub');

        if (group) {
          item.querySelector('.nav-item>.nav-link:not(.disabled)').addEventListener('click', (e: any) => {
            e.preventDefault();

            if (item.classList.contains('nav-item-open')) {
              item.classList.remove('nav-item-open');
              group.style.display = 'none';
            } else {
              item.classList.add('nav-item-open');
              group.style.display = 'block';
            }
          });
        }
      });
    });
  }
}
