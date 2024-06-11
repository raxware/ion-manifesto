import { Injectable, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import * as Hammer from 'hammerjs';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

@Injectable({
  providedIn: 'root'
})
export class HammerConfig extends HammerGestureConfig {

  override overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL },
    'doubletap': new Hammer.Tap({ event: 'doubletap', taps: 2 }),
  };
}

registerSwiperElements();
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(HammerModule),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
});
