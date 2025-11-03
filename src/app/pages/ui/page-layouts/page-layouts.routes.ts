import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blank',
    loadComponent: () =>
      import('./blank/blank.component').then((m) => m.BlankComponent)
  },
  {
    path: 'simple',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './simple/page-layout-simple/page-layout-simple.component'
          ).then((m) => m.PageLayoutSimpleComponent)
      },
      {
        path: 'tabbed',
        loadComponent: () =>
          import(
            './simple/page-layout-simple-tabbed/page-layout-simple-tabbed.component'
          ).then((m) => m.PageLayoutSimpleTabbedComponent)
      },
      {
        path: 'large-header',
        loadComponent: () =>
          import(
            './simple/page-layout-simple-large-header/page-layout-simple-large-header.component'
          ).then((m) => m.PageLayoutSimpleLargeHeaderComponent)
      },
      {
        path: 'large-header/tabbed',
        loadComponent: () =>
          import(
            './simple/page-layout-simple-large-header-tabbed/page-layout-simple-large-header-tabbed.component'
          ).then((m) => m.PageLayoutSimpleLargeHeaderTabbedComponent)
      }
    ]
  },
  {
    path: 'card',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./card/page-layout-card/page-layout-card.component').then(
            (m) => m.PageLayoutCardComponent
          )
      },
      {
        path: 'tabbed',
        loadComponent: () =>
          import(
            './card/page-layout-card-tabbed/page-layout-card-tabbed.component'
          ).then((m) => m.PageLayoutCardTabbedComponent)
      },
      {
        path: 'large-header',
        loadComponent: () =>
          import(
            './card/page-layout-card-large-header/page-layout-card-large-header.component'
          ).then((m) => m.PageLayoutCardLargeHeaderComponent)
      },
      {
        path: 'large-header/tabbed',
        loadComponent: () =>
          import(
            './card/page-layout-card-large-header-tabbed/page-layout-card-large-header-tabbed.component'
          ).then((m) => m.PageLayoutCardLargeHeaderTabbedComponent)
      }
    ]
  }
];

export default routes;
