import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';  // ✅ NUEVO
import { provideIcons } from './core/icons/icons.provider';
import { provideLuxon } from './core/luxon/luxon.provider';
import { provideVex } from '@vex/vex.provider';
import { provideNavigation } from './core/navigation/navigation.provider';
import { vexConfigs } from '@vex/config/vex-configs';
import { provideQuillConfig } from 'ngx-quill';
import { interceptServiceInterceptor } from './pages/pages/auth/login/intercept.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatDialogModule,
      MatBottomSheetModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      MatIconModule  // ✅ NUEVO
    ),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([interceptServiceInterceptor]) // ✅ CORRECTO
    ),

    provideVex({
      config: vexConfigs.poseidon,
      availableThemes: [
        { name: 'Default', className: 'vex-theme-default' },
        { name: 'Teal', className: 'vex-theme-teal' },
        { name: 'Green', className: 'vex-theme-green' },
        { name: 'Purple', className: 'vex-theme-purple' },
        { name: 'Red', className: 'vex-theme-red' },
        { name: 'Orange', className: 'vex-theme-orange' }
      ]
    }),
    provideNavigation(),
    provideIcons(),
    provideLuxon(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    })
  ]
};
