import { ScrumboardComponent } from './scrumboard.component';
const routes = [
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
//# sourceMappingURL=scrumboard.routes.js.map