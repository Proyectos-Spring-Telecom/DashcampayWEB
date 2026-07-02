import { SocialComponent } from './social.component';
const routes = [
    {
        path: '',
        component: SocialComponent,
        data: {
            toolbarShadowEnabled: true
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./social-profile/social-profile.component').then((m) => m.SocialProfileComponent)
            },
            {
                path: 'timeline',
                loadComponent: () => import('./social-timeline/social-timeline.component').then((m) => m.SocialTimelineComponent)
            }
        ]
    }
];
export default routes;
//# sourceMappingURL=social.routes.js.map