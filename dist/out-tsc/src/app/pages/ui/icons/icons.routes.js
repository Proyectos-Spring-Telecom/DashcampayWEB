import { IconsComponent } from './icons.component';
const routes = [
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
                loadComponent: () => import('./icons-ic/icons-ic.component').then((m) => m.IconsIcComponent)
            },
            {
                path: 'fa',
                loadComponent: () => import('./icons-fa/icons-fa.component').then((m) => m.IconsFaComponent)
            }
        ]
    }
];
export default routes;
//# sourceMappingURL=icons.routes.js.map