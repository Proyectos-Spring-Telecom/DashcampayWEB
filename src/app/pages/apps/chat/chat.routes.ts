import { ChatComponent } from './chat.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatEmptyComponent } from './chat-empty/chat-empty.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: ChatComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: false,
      footerVisible: false
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ChatEmptyComponent
      },
      {
        path: ':chatId',
        component: ChatConversationComponent
      }
    ]
  }
];

export default routes;
