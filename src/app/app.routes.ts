import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  // 🔹 Redirección automática al login al iniciar la app
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      )
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      )
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/pages/auth/signup/signup.component').then(
        (m) => m.SignupComponent
      )
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        './pages/pages/auth/forgot-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent)
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./pages/pages/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      )
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboards/analytics',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/dashboards/dashboard-analytics/dashboard-analytics.component'
          ).then((m) => m.DashboardAnalyticsComponent)
      },
      {
        path: 'apps',
        children: [
          {
            path: 'chat',
            loadChildren: () => import('./pages/apps/chat/chat.routes')
          },
          {
            path: 'mail',
            loadChildren: () => import('./pages/apps/mail/mail.routes'),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true
            }
          },
          {
            path: 'social',
            loadChildren: () => import('./pages/apps/social/social.routes')
          },
          {
            path: 'contacts',
            loadChildren: () => import('./pages/apps/contacts/contacts.routes')
          },
          {
            path: 'calendar',
            loadComponent: () =>
              import('./pages/apps/calendar/calendar.component').then(
                (m) => m.CalendarComponent
              ),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'aio-table',
            loadComponent: () =>
              import('./pages/apps/aio-table/aio-table.component').then(
                (m) => m.AioTableComponent
              ),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'help-center',
            loadChildren: () =>
              import('./pages/apps/help-center/help-center.routes')
          },
          {
            path: 'scrumboard',
            loadChildren: () =>
              import('./pages/apps/scrumboard/scrumboard.routes')
          },
          {
            path: 'editor',
            loadComponent: () =>
              import('./pages/apps/editor/editor.component').then(
                (m) => m.EditorComponent
              ),
            data: {
              scrollDisabled: true
            }
          }
        ]
      },
      {
        path: 'administracion',
        children: [
          {
            path: 'validadores',
            loadChildren: () => import('./pages/administracion/dispositivos/dispositivos.module')
              .then(m => m.DispositivosModule)
          },
          {
            path: 'vehiculos',
            loadChildren: () => import('./pages/administracion/vehiculos/vehiculos.module')
              .then(m => m.VehiculosModule)
          },
          {
            path: 'operadores',
            loadChildren: () => import('./pages/administracion/operadores/operadores.module')
              .then(m => m.OperadoresModule)
          },
          {
            path: 'monederos',
            loadChildren: () => import('./pages/administracion/monederos/monederos.module')
              .then(m => m.MonederosModule)
          },
          {
            path: 'pasajeros',
            loadChildren: () => import('./pages/administracion/pasajeros/pasajeros.module')
              .then(m => m.PasajerosModule)
          },
          {
            path: 'transacciones',
            loadChildren: () => import('./pages/administracion/transacciones/transacciones.module')
              .then(m => m.TransaccionesModule)
          },
          {
            path: 'bitacora',
            loadChildren: () => import('./pages/administracion/bitacora/bitacora.module')
              .then(m => m.BitacoraModule)
          },
          {
            path: 'perfil-usuario',
            loadChildren: () => import('./pages/administracion/usuarios/perfil-usuario/perfil-usuario.module')
              .then(m => m.PerfilUsuarioModule)
          },
          {
            path: 'usuarios',
            loadChildren: () => import('./pages/administracion/usuarios/usuarios.module')  
              .then(m => m.UsuariosModule)
          },
          {
            path: 'clientes',
            loadChildren: () => import('./pages/administracion/clientes/clientes.module')  
              .then(m => m.ClientesModule)
          },
          {
            path: 'talleres',
            loadChildren:() => import('./pages/administracion/talleres/talleres.module')
              .then(m => m.TalleresModule)
          },
          {
            path: 'mantenimientos',
            loadChildren:() => import('./pages/administracion/mantenimientos/mantenimientos.module')
              .then(m => m.MantenimientosModule)
          },
          {
            path: 'permisos',
            loadChildren:() => import('./pages/administracion/permisos/permisos.module')
              .then(m => m.PermisosModule)
          },
          {
            path: 'modulos',
            loadChildren:() => import('./pages/administracion/modulos/modulos.module')
              .then(m => m.ModulosModule)
          },
          {
            path: 'contadora',
            loadChildren:() => import('./pages/administracion/contador/contador.module')
              .then(m => m.ContadorModule)
          },
          {
            path: 'rutas',
            loadChildren:() => import('./pages/administracion/rutas/rutas.module')
              .then(m => m.RutasModule)
          },
          {
            path: 'monitoreo',
            loadChildren:() => import('./pages/administracion/monitoreo/monitoreo.module')
              .then(m => m.MonitoreoModule)
          },
          {
            path: 'dashboard',
            loadChildren:() => import('./pages/administracion/dashboard/dashboard.module')
              .then(m => m.DashboardModule)
          },
          {
            path: 'roles',
            loadChildren:() => import('./pages/administracion/roles/roles.module')
              .then(m => m.RolesModule)
          },
          {
            path: 'punto-venta',
            loadChildren:() => import('./pages/administracion/punto-venta/punto-venta.module')
              .then(m => m.PuntoVentaModule)
          },
          {
            path: 'variantes',
            loadChildren:() => import('./pages/administracion/variantes/variantes.module')
              .then(m => m.VariantesModule)
          },
          {
            path: 'zonas',
            loadChildren:() => import('./pages/administracion/zonas/zonas.module')
              .then(m => m.ZonasModule)
          },
          {
            path: 'instalaciones',
            loadChildren:() => import('./pages/administracion/instalacion/instalacion.module')
              .then(m => m.InstalacionModule)
          },
          {
            path: 'reportes',
            loadChildren:() => import('./pages/administracion/reportes/reportes.module')
              .then(m => m.ReportesModule)
          },
          {
            path: 'tarifas',
            loadChildren:() => import('./pages/administracion/tarifas/tarifas.module')
              .then(m => m.TarifasModule)
          },
          {
            path: 'turnos',
            loadChildren:() => import('./pages/administracion/turnos/turnos.module')
              .then(m => m.TurnosModule)
          },
          {
            path: 'bitacora-viajes',
            loadChildren:() => import('./pages/administracion/bitacora-viajes/bitacora-viajes.module')
              .then(m => m.BitacoraViajesModule)
          },
          {
            path: 'perfil-pasajero',
            loadChildren:() => import('./pages/administracion/perfil-pasajero/perfil-pasajero.module')
              .then(m => m.PerfilPasajeroModule)
          }
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'pricing',
            loadComponent: () =>
              import('./pages/pages/pricing/pricing.component').then(
                (m) => m.PricingComponent
              )
          },
          {
            path: 'faq',
            loadComponent: () =>
              import('./pages/pages/faq/faq.component').then(
                (m) => m.FaqComponent
              )
          },
          {
            path: 'guides',
            loadComponent: () =>
              import('./pages/pages/guides/guides.component').then(
                (m) => m.GuidesComponent
              )
          },
          {
            path: 'invoice',
            loadComponent: () =>
              import('./pages/pages/invoice/invoice.component').then(
                (m) => m.InvoiceComponent
              )
          },
          {
            path: 'error-404',
            loadComponent: () =>
              import('./pages/pages/errors/error-404/error-404.component').then(
                (m) => m.Error404Component
              )
          },
          {
            path: 'error-500',
            loadComponent: () =>
              import('./pages/pages/errors/error-500/error-500.component').then(
                (m) => m.Error500Component
              )
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'components',
            loadChildren: () =>
              import('./pages/ui/components/components.routes')
          },
          {
            path: 'forms/form-elements',
            loadComponent: () =>
              import(
                './pages/ui/forms/form-elements/form-elements.component'
              ).then((m) => m.FormElementsComponent)
          },
          {
            path: 'forms/form-wizard',
            loadComponent: () =>
              import('./pages/ui/forms/form-wizard/form-wizard.component').then(
                (m) => m.FormWizardComponent
              )
          },
          {
            path: 'icons',
            loadChildren: () => import('./pages/ui/icons/icons.routes')
          },
          {
            path: 'page-layouts',
            loadChildren: () =>
              import('./pages/ui/page-layouts/page-layouts.routes')
          }
        ]
      },
      {
        path: 'documentation',
        loadChildren: () => import('./pages/documentation/documentation.routes')
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/pages/errors/error-404/error-404.component').then(
            (m) => m.Error404Component
          )
      }
    ]
  }
];
