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

  getSidebars(): any {
    const menu = [
      { name: 'Dashboard', icon: 'home', link: '/admin' },
      {
        name: 'Layouts',
        icon: 'user',
        link: null,
        children: [
          { name: 'Layout 1', link: '/layout-1' },
          { name: 'Layout 2', link: '/layout-2' },
        ],
      },
      {
        name: 'Components',
        icon: 'times',
        link: null,
        children: [
          { name: 'Component 1', link: '/component-1' },
          { name: 'Component 2', link: '/component-2' },
        ],
      },
    ];

    return menu;
  }
}
