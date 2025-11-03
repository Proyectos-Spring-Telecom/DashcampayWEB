import { Routes } from '@angular/router';
import { MailComponent } from './containers/mail.component';
import { MailListComponent } from './containers/mail-list.component';
import { MailViewComponent } from './containers/mail-view.component';
import { MailViewEmptyComponent } from './containers/mail-view-empty.component';

const routes: Routes = [
  {
    path: '',
    component: MailComponent,
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full'
      },
      {
        path: ':filterId',
        component: MailListComponent,
        children: [
          {
            path: '',
            component: MailViewEmptyComponent
          },
          {
            path: ':mailId',
            component: MailViewComponent
          }
        ]
      }
    ]
  }
];

export default routes;
