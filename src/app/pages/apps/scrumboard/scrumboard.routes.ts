import { ScrumboardComponent } from './scrumboard.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full'
  },
  {
    path: ':scrumboardId',
    component: ScrumboardComponent,
    data: {
      scrollDisabled: true
    }
  }
];

export default routes;
