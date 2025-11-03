<div style="margin-bottom: 2rem;">
<img style="float: left; height: 80px; width: unset; margin: 0;" src="/assets/img/logo/logo.svg" alt="Vex Logo"/>
<h1 style="height: 80px; line-height: 80px; margin: 0 0 0 70px; font-weight: 800; border: none; font-size: 3rem;">VEX</h1>
</div>

# Changelog

## 17.0.0 (2024-01-03)

- Upgrade to Angular ^17.0
- Upgrade all dependencies to latest compatible versions

## 16.3.0 (2023-11-01)

- Improve layout customization
- Update layout classes to have consistent naming
- Update roundness for all layouts
- Add options for dense components
- Consistent usage of LayoutService and ConfigService
- Various visual inconsistency fixes

## 16.2.0 (2023-10-27)

- Improve theme handling: Allow easy changing of theme colors and consistent styling through a single configuration file for Angular Material colors and TailwindCSS colors.
- Switch to Angular Standalone Components for better performance, smaller bundle size and better portability
- Improve VEX providers and services: Allow easy customization of the layout, config and available themes using providers
- Replace all manual subscription handling with @angular/core takeUntilDestroyed operator
- Add prettier for consistent code formatting
- Upgrade all dependencies to latest compatible versions

## 16.1.0 (2023-10-11)

- Enable strict mode in tsconfig.json
- Upgrade all dependencies to latest compatible versions
- Upgrade to Angular ^16.1

## 16.0.0 (2023-05-22)

- Upgrade to Angular ^16

## 15.0.0 (2023-03-28)

- Upgrade to Angular ^15
- Update all dependencies
- Adjust styles and theming for Angular Material v15 MDC changes

## 14.1.1 (2022-09-06)

- Update all dependencies
- Fix: Toolbar-Notifications icon not following theme color

## 14.1.0 (2022-06-13)

- Add "Poseidon" Layout with new color schemes
- Add optional User-Profile in Sidenav
- Add optional Quick Search in Sidenav
- Add configuration for button roundness

## 14.0.0 (2022-06-05)

- Upgrade to Angular ^14.0
- Upgrade all dependencies to latest compatible versions
- Add customizable border-radius of all elements
- Add advanced font features
- Various small improvements

## 13.1.0 (2022-01-17)

- Upgrade to Angular ^13.1
- Upgrade all dependencies to latest compatible versions

### Notable code changes:

- Updated tsconfig.\* files to latest Angular recommendation

## 13.0.0 (2021-11-22)

- Upgrade to Angular ^13.0
- Upgrade all dependencies to latest compatible versions

## 12.0.0 (2021-06-21)

- Upgrade to Angular ^12.0
- Upgrade all dependencies to latest compatible versions
- Adjust SCSS for @angular/material changes

## 11.1.0 (2021-03-12)

- Upgrade to Angular ^11.2
- Upgrade all dependencies to latest compatible versions
- Simplify TailwindCSS setup

## 11.0.0 (2020-11-12)

- Upgrade to Angular 11+
- Upgrade all dependencies to latest compatible versions

## 10.0.2 (2020-10-01)

- Upgrade all dependencies to latest versions

## 10.0.0 (2020-07-06)

### Features

- Upgrade to Angular 10+
- Upgrade all dependencies to latest compatible versions

### Breaking Changes

We switched from ngx-take-until-destroy to ngneat/until-destroy (the successor of the first library available for Angular 10+) and there are adjustments needed. There's an easy migration script:

1. `cd src` (into your /src folder in the vex-angular folder)
2. run `npx @ngneat/until-destroy --removeOnDestroy`

A few occurences could still appear, because the automated script can't pick them up. Here's a step-by-step on how to manually adjust the entries:

Replace:
`import { untilDestroyed } from 'ngx-take-until-destroy';`

With:
`import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';`

and add `@UntilDestroy()` above your `@Component()` or `@Injectable()`

Example:

```typescript
@UntilDestroy()
@Injectable()
export class TestService {
  test() {
    test$.pipe(untilDestroyed(this)).subscribe((value) => doStuff(value));
  }
}
```

This library and structure is needed so any subscriptions we create get automatically cleaned up (unsubscribed) when the component/service gets destroyed by Angular.

## 9.2.0 (2020-06-03)

### Features

- Add [Mailbox](/apps/mail)
- Improve letter-spacing/line-height of Typography for best readability: [Inter Dynamic Metrics](https://rsms.me/inter/dynmetrics/)

### Fixes

- Load icons on icons demo page deferred to improve build time when developing

## 9.1.0 (2020-05-13)

### Features

- Add [Social/Timeline](/apps/social/timeline) page
- Simplify color customization, simply change the CSS Variables
- Add Progress Bar indicating lazy loaded routes being loaded
- Changing direction (RTL/LTR) now doesn't require a reload and can be changed anytime
- Upgrade dependencies
- Change Font Family

### Fixes

- Sidenav now hidden correctly on Hermes/Ikaros (Vertical Layouts)
- Input Dropdown Icon now correctly aligned (vertical & horizontal)
- Ares Layout: Navigation active color correctly used now

## 9.0.0 (2020-03-24)

### Features

- Upgrade to Angular 9+
- Upgrade to Angular Material 9+
- Upgrade all dependencies to be compatible with Angular 9
- Upgrade to TypeScript 3.7.5

## 8.4.0 (2019-11-18)

### Features

- Add CustomLayoutComponent to easily create your own custom layout component and customize the template even easier
- If needed, you can now enable strictFunctionTypes & noImplicitReturns in your tsconfig.json
- Add more customization options using NavigationService (Change title & logo in sidenav)
- Add example config with customized completely customized layout and custom title & logo

## 8.3.0 (2019-10-22)

### Features

- Add global search (click on the search button in toolbar)
- Add WYSIWYG Editor
- Add more custom columns to All-In-One Table

### Fixes

- Improve dark mode styles, especially color usage is using opacity now
- Contact Table is now fully responsive
- General style improvements

## 8.2.0 (2019-10-07)

### Features

- Add Typings for TailwindCSS, use TailwindCSS configuration inside your Angular application - 1 Configuration file!

### Fixes

- Fix minor issue on mobile devices, dashboard was overflowing and forced a horizontal scroll on some devices

## 8.1.0 (2019-10-02)

### Features

- Add PurgeCSS to improve build size even more

### Fixed

- Fix minor issue with styles and build

## 8.0.0 (2019-09-19)

### Features

- Added 15 design variations (5 layouts with 3 different styles per layout)
- Allow Top Navigation to have direct links instead of only dropdowns
- Add TailwindCSS for easy customization of Utility CSS

### Fixes

- Optimize Paddings/Margins
- Optimize RTL
- Optimize Styling for Layouts

## 1.0.0 (2019-08-22)

### Features

- Initial release
