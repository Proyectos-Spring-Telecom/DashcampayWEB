import { DocumentationComponent } from './documentation.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: 'changelog',
    loadComponent: () =>
      import('./changelog/changelog.component').then(
        (m) => m.ChangelogComponent
      )
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
      },
      {
        path: 'introduction',
        component: DocumentationComponent
      },
      {
        path: 'folder-structure',
        component: DocumentationComponent
      },
      {
        path: 'installation',
        component: DocumentationComponent
      },
      {
        path: 'changing-styling-and-css-variables',
        component: DocumentationComponent
      },
      {
        path: 'using-custom-colors-for-the-primarysecondarywarn-palettes',
        component: DocumentationComponent
      },
      {
        path: 'build-for-production',
        component: DocumentationComponent
      },
      {
        path: 'start-development-server',
        component: DocumentationComponent
      },
      {
        path: 'further-help',
        component: DocumentationComponent
      },
      {
        path: 'configuration',
        component: DocumentationComponent
      },
      {
        path: 'adding-menu-items',
        component: DocumentationComponent
      }
    ]
  }
];

export default routes;
