import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {AppComponent} from "./app/app.component";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app/app.routes";
import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";


bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(AppRoutes))]
}).catch(err => console.error(err));
