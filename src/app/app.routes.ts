import {Routes} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export const AppRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.rotues').then((x)=> x.AdminRotues),
    providers: [importProvidersFrom(HttpClientModule)]
  },
  {
    path: 'auth', pathMatch: 'full', redirectTo: 'admin'
  },
  {
    path: '**',
    redirectTo: 'admin'
  }

];
