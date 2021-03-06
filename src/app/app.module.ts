import { NgModule, Inject, LOCALE_ID, PLATFORM_ID, APP_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

// LOCATION
import { Location, registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

// STORE
import { NgrxModule } from '@store/ngrx.module';

// SERVICE
import { GlobalService, SidebarService } from '@services';
import {
  GlobalService as PrivateGlobalService,
  SidebarService as PrivateSidebarService,
} from '@services/private';

// INTERCEPTOR
import { TransferStateInterceptor } from '@interceptors';

// MODULE
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@core/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// COMPONENT
import { AppComponent } from './app.component';

// COMPONENT (PUBLIC)
import { HomeComponent as PublicHomeComponent } from '@templates/public/container/home/home.component';
import { PageComponent as PublicPageComponent } from '@templates/public/container/page/page.component';
import { NavbarComponent as PublicNavbarComponent } from '@templates/public/navbar/navbar.component';
import { SidebarComponent as PublicSidebarComponent } from '@templates/public/sidebar/sidebar.component';
import { FooterComponent as PublicFooterComponent } from '@templates/public/footer/footer.component';

// COMPONENT (PRIVATE)
import { AdminComponent as PrivateAdminComponent } from '@templates/private/container/admin/admin.component';
import { NavbarComponent as PrivateNavbarComponent } from '@templates/private/navbar/navbar.component';
import { MainComponent as PrivateSidebarMainComponent } from '@templates/private/sidebar/main/main.component';

// LOCALIZE
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser } from '@gilsdav/ngx-translate-router';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';

registerLocaleData(localeId);

export function translateLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, `${environment.locales}assets/locales/`, '.json');
}

export function localizeLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
): any {
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    settings,
    http,
    `${environment.locales}assets/locales.json`
  );
}

@NgModule({
  declarations: [
    AppComponent,
    PublicHomeComponent,
    PublicPageComponent,
    PublicNavbarComponent,
    PublicSidebarComponent,
    PublicFooterComponent,
    PrivateAdminComponent,
    PrivateNavbarComponent,
    PrivateSidebarMainComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-bootstrap' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    RouterModule.forRoot(AppRoutingModule, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'disabled',
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LocalizeRouterModule.forRoot(AppRoutingModule, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
      },
      initialNavigation: true,
    }),
    NgrxModule,
    SharedModule,
    NgbModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'id',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransferStateInterceptor,
      multi: true,
    },
    Title,
    GlobalService,
    SidebarService,
    PrivateGlobalService,
    PrivateSidebarService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: object, @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
