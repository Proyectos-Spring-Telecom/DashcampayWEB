import { VexThemes } from '../plugins/themes';

export function createThemeClassName(themeName: keyof VexThemes): string {
  return `.vex-theme-${themeName}`;
}

export function createColorSchemeClassName(
  colorScheme: 'light' | 'dark'
): string {
  return `.${colorScheme}`;
}

export function createColorVariableName(
  colorName: string,
  colorShade: string
): string {
  return `--vex-color-${colorName}-${colorShade}`;
}

export function createAngularMaterialComponentColorVariableName(
  sectionName: string,
  componentName: string
): string {
  return `--vex-${sectionName}-${componentName}`;
}
