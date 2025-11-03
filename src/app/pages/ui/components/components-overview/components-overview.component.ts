import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentsOverviewSnackBarComponent } from './components/components-overview-snack-bar/components-overview-snack-bar.component';
import { ComponentsOverviewInputComponent } from './components/components-overview-input/components-overview-input.component';
import { ComponentsOverviewMenuComponent } from './components/components-overview-menu/components-overview-menu.component';
import { ComponentsOverviewListsComponent } from './components/components-overview-lists/components-overview-lists.component';
import { ComponentsOverviewButtonsComponent } from './components/components-overview-buttons/components-overview-buttons.component';
import { ComponentsOverviewGridListComponent } from './components/components-overview-grid-list/components-overview-grid-list.component';
import { ComponentsOverviewProgressComponent } from './components/components-overview-progress/components-overview-progress.component';
import { ComponentsOverviewProgressSpinnerComponent } from './components/components-overview-progress-spinner/components-overview-progress-spinner.component';
import { ComponentsOverviewTooltipComponent } from './components/components-overview-tooltip/components-overview-tooltip.component';
import { ComponentsOverviewSliderComponent } from './components/components-overview-slider/components-overview-slider.component';
import { ComponentsOverviewDialogsComponent } from './components/components-overview-dialogs/components-overview-dialogs.component';
import { ComponentsOverviewCheckboxComponent } from './components/components-overview-checkbox/components-overview-checkbox.component';
import { ComponentsOverviewCardsComponent } from './components/components-overview-cards/components-overview-cards.component';
import { ComponentsOverviewSlideToggleComponent } from './components/components-overview-slide-toggle/components-overview-slide-toggle.component';
import { ComponentsOverviewAutocompleteComponent } from './components/components-overview-autocomplete/components-overview-autocomplete.component';
import { ComponentsOverviewRadioComponent } from './components/components-overview-radio/components-overview-radio.component';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VexHighlightModule } from '@vex/components/vex-highlight/vex-highlight.module';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'vex-components-overview',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss'],
  animations: [stagger80ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    MatListModule,
    MatRippleModule,
    MatSnackBarModule,
    VexHighlightModule,
    ComponentsOverviewAutocompleteComponent,
    ComponentsOverviewButtonsComponent,
    ComponentsOverviewCardsComponent,
    ComponentsOverviewCheckboxComponent,
    ComponentsOverviewDialogsComponent,
    ComponentsOverviewGridListComponent,
    ComponentsOverviewInputComponent,
    ComponentsOverviewListsComponent,
    ComponentsOverviewMenuComponent,
    ComponentsOverviewProgressComponent,
    ComponentsOverviewProgressSpinnerComponent,
    ComponentsOverviewRadioComponent,
    ComponentsOverviewSliderComponent,
    ComponentsOverviewSlideToggleComponent,
    ComponentsOverviewSnackBarComponent,
    ComponentsOverviewTooltipComponent,
    NgForOf
  ]
})
export class ComponentsOverviewComponent {
  @ViewChild(ComponentsOverviewAutocompleteComponent, {
    read: ElementRef,
    static: true
  })
  private autocomplete?: ElementRef;
  @ViewChild(ComponentsOverviewButtonsComponent, {
    read: ElementRef,
    static: true
  })
  private buttons?: ElementRef;
  @ViewChild(ComponentsOverviewCardsComponent, {
    read: ElementRef,
    static: true
  })
  private cards?: ElementRef;
  @ViewChild(ComponentsOverviewCheckboxComponent, {
    read: ElementRef,
    static: true
  })
  private checkbox?: ElementRef;
  @ViewChild(ComponentsOverviewDialogsComponent, {
    read: ElementRef,
    static: true
  })
  private dialogs?: ElementRef;
  @ViewChild(ComponentsOverviewGridListComponent, {
    read: ElementRef,
    static: true
  })
  private gridList?: ElementRef;
  @ViewChild(ComponentsOverviewInputComponent, {
    read: ElementRef,
    static: true
  })
  private input?: ElementRef;
  @ViewChild(ComponentsOverviewListsComponent, {
    read: ElementRef,
    static: true
  })
  private lists?: ElementRef;
  @ViewChild(ComponentsOverviewMenuComponent, {
    read: ElementRef,
    static: true
  })
  private menu?: ElementRef;
  @ViewChild(ComponentsOverviewProgressComponent, {
    read: ElementRef,
    static: true
  })
  private progress?: ElementRef;
  @ViewChild(ComponentsOverviewProgressSpinnerComponent, {
    read: ElementRef,
    static: true
  })
  private progressSpinner?: ElementRef;
  @ViewChild(ComponentsOverviewRadioComponent, {
    read: ElementRef,
    static: true
  })
  private radio?: ElementRef;
  @ViewChild(ComponentsOverviewSliderComponent, {
    read: ElementRef,
    static: true
  })
  private slider?: ElementRef;
  @ViewChild(ComponentsOverviewSlideToggleComponent, {
    read: ElementRef,
    static: true
  })
  private slideToggle?: ElementRef;
  @ViewChild(ComponentsOverviewSnackBarComponent, {
    read: ElementRef,
    static: true
  })
  private snackBar?: ElementRef;
  @ViewChild(ComponentsOverviewTooltipComponent, {
    read: ElementRef,
    static: true
  })
  private tooltip?: ElementRef;

  navigationItems: { label: string; fragment: string }[] = [
    {
      label: 'Autocomplete',
      fragment: 'autocomplete'
    },
    {
      label: 'Buttons',
      fragment: 'buttons'
    },
    {
      label: 'Cards',
      fragment: 'cards'
    },
    {
      label: 'Checkbox',
      fragment: 'checkbox'
    },
    {
      label: 'Dialogs',
      fragment: 'dialogs'
    },
    {
      label: 'Grid List',
      fragment: 'gridList'
    },
    {
      label: 'Input',
      fragment: 'input'
    },
    {
      label: 'Lists',
      fragment: 'lists'
    },
    {
      label: 'Menu',
      fragment: 'menu'
    },
    {
      label: 'Progress',
      fragment: 'progress'
    },
    {
      label: 'Progress Spinner',
      fragment: 'progressSpinner'
    },
    {
      label: 'Radio',
      fragment: 'radio'
    },
    {
      label: 'Slider',
      fragment: 'slider'
    },
    {
      label: 'Slide Toggle',
      fragment: 'slideToggle'
    },
    {
      label: 'Snack Bar',
      fragment: 'snack-bar'
    },
    {
      label: 'Tooltip',
      fragment: 'tooltip'
    }
  ];

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  scrollTo(elementName: string) {
    const elem = this[
      elementName as keyof ComponentsOverviewComponent
    ] as unknown as ElementRef | undefined;

    if (!elem || !elem.nativeElement) {
      return;
    }

    this.scrollDispatcher.getAncestorScrollContainers(elem)[0].scrollTo({
      top: elem.nativeElement.offsetTop - 24,
      behavior: 'smooth'
    });
  }
}
