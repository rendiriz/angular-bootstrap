import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SidebarService {
  constructor() {}

  private sidebarSource = new BehaviorSubject([]);
  currentSidebar = this.sidebarSource.asObservable();

  changeSidebar(sidebar: any): void {
    this.sidebarSource.next(sidebar);
  }

  getFoundations(): any {
    const menu = [
      { name: 'color', link: '/foundations/color' },
      { name: 'typography', link: '/foundations/typography' },
    ];

    return menu;
  }

  getComponents(): any {
    const menu = [
      { name: 'breadcrumbs', link: '/components/breadcrumbs' },
      { name: 'button', link: '/components/button' },
      { name: 'checkbox', link: '/components/checkbox' },
      { name: 'dropdown-menu', link: '/components/dropdown-menu' },
      { name: 'pagination', link: '/components/pagination' },
      { name: 'radio', link: '/components/radio' },
      { name: 'section-message', link: '/components/section-message' },
      { name: 'select', link: '/components/select' },
      { name: 'table', link: '/components/table' },
      { name: 'tabs', link: '/components/tabs' },
      { name: 'textfield', link: '/components/textfield' },
      { name: 'tooltip', link: '/components/tooltip' },
    ];

    return menu;
  }
}