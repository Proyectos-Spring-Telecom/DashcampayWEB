import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: 'grid',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: ':activeCategory',
        loadComponent: () =>
          import('./contacts-grid/contacts-grid.component').then(
            (m) => m.ContactsGridComponent
          ),
        data: {
          scrollDisabled: true,
          toolbarShadowEnabled: false
        }
      }
    ]
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./contacts-table/contacts-table.component').then(
        (m) => m.ContactsTableComponent
      ),
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];

export default routes;
