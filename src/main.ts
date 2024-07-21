import { Injectable, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import * as Hammer from 'hammerjs';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';

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
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(HammerModule),
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }, 
    provideFirebaseApp(() => initializeApp({"projectId":"manifesto-268c5","appId":"1:167271764279:web:a156eaed7b7723d6d58ab2","storageBucket":"manifesto-268c5.appspot.com",
      "apiKey":"AIzaSyB8ISzWHB4YBy6S4QX6apmeal6tpdI6q4E","authDomain":"manifesto-268c5.firebaseapp.com","messagingSenderId":"167271764279","measurementId":"G-XVJEEQW56C"})), 
    provideAuth(() => getAuth())
  ],
});
