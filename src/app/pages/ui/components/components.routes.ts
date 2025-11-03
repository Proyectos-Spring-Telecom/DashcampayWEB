import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: 'overview',
    loadComponent: () =>
      import('./components-overview/components-overview.component').then(
        (m) => m.ComponentsOverviewComponent
      )
  },
  {
    path: 'autocomplete',
    loadComponent: () =>
      import(
        './components-autocomplete/components-autocomplete.component'
      ).then((m) => m.ComponentsAutocompleteComponent)
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./components-buttons/components-buttons.component').then(
        (m) => m.ComponentsButtonsComponent
      )
  },
  {
    path: 'button-group',
    loadComponent: () =>
      import(
        './components-button-group/components-button-group.component'
      ).then((m) => m.ComponentsButtonGroupComponent)
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./components-cards/components-cards.component').then(
        (m) => m.ComponentsCardsComponent
      )
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./components-checkbox/components-checkbox.component').then(
        (m) => m.ComponentsCheckboxComponent
      )
  },
  {
    path: 'dialogs',
    loadComponent: () =>
      import('./components-dialogs/components-dialogs.component').then(
        (m) => m.ComponentsDialogsComponent
      )
  },
  {
    path: 'grid-list',
    loadComponent: () =>
      import('./components-grid-list/components-grid-list.component').then(
        (m) => m.ComponentsGridListComponent
      )
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./components-input/components-input.component').then(
        (m) => m.ComponentsInputComponent
      )
  },
  {
    path: 'lists',
    loadComponent: () =>
      import('./components-lists/components-lists.component').then(
        (m) => m.ComponentsListsComponent
      )
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./components-menu/components-menu.component').then(
        (m) => m.ComponentsMenuComponent
      )
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./components-progress/components-progress.component').then(
        (m) => m.ComponentsProgressComponent
      )
  },
  {
    path: 'progress-spinner',
    loadComponent: () =>
      import(
        './components-progress-spinner/components-progress-spinner.component'
      ).then((m) => m.ComponentsProgressSpinnerComponent)
  },
  {
    path: 'radio',
    loadComponent: () =>
      import('./components-radio/components-radio.component').then(
        (m) => m.ComponentsRadioComponent
      )
  },
  {
    path: 'slide-toggle',
    loadComponent: () =>
      import(
        './components-slide-toggle/components-slide-toggle.component'
      ).then((m) => m.ComponentsSlideToggleComponent)
  },
  {
    path: 'slider',
    loadComponent: () =>
      import('./components-slider/components-slider.component').then(
        (m) => m.ComponentsSliderComponent
      )
  },
  {
    path: 'snack-bar',
    loadComponent: () =>
      import('./components-snack-bar/components-snack-bar.component').then(
        (m) => m.ComponentsSnackBarComponent
      )
  },
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./components-tooltip/components-tooltip.component').then(
        (m) => m.ComponentsTooltipComponent
      )
  }
];

export default routes;
