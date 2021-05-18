import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// SERVICE
import { GlobalService, SidebarService } from '@services';

// PACKAGE
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class SidebarFoundationsResolver implements Resolve<any> {
  constructor(
    private globalService: GlobalService,
    private sidebarService: SidebarService,
    private translateService: TranslateService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.translateService.get('foundations').subscribe((trans) => {
      this.globalService.changeSidebar(trans);
    });

    const menu = this.sidebarService.getFoundations();
    this.sidebarService.changeSidebar(menu);
  }
}
