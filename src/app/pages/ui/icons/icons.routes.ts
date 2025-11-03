import { IconsComponent } from './icons.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: IconsComponent,
    data: {
      scrollDisabled: true
    },
    children: [
      {
        path: '',
        redirectTo: 'ic',
        pathMatch: 'full'
      },
      {
        path: 'ic',
        loadComponent: () =>
          import('./icons-ic/icons-ic.component').then(
            (m) => m.IconsIcComponent
          )
      },
      {
        path: 'fa',
        loadComponent: () =>
          import('./icons-fa/icons-fa.component').then(
            (m) => m.IconsFaComponent
          )
      }
    ]
  }
];

export default routes;
