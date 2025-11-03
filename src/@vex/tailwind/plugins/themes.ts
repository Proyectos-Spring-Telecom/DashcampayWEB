import plugin from 'tailwindcss/plugin';
import {
  CSSRuleObject,
  PluginAPI,
  PluginCreator
} from 'tailwindcss/types/config';
import { Config } from 'tailwindcss';
import chroma from 'chroma-js';
import generateScss, { inheritDefaultTheme } from '../utils/generate-scss';
import {
  createAngularMaterialComponentColorVariableName,
  createColorSchemeClassName,
  createColorVariableName,
  createThemeClassName
} from '../utils/naming';
// noinspection ES6PreferShortImport
import { DeepPartial } from '../../interfaces/deep-partial.type';

export interface VexThemeColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;

  [shade: string]: string;
}

export interface VexThemeColorOptions {
  defaults: {
    lighter: keyof VexThemeColorPalette;
    default: keyof VexThemeColorPalette;
    darker: keyof VexThemeColorPalette;
  };
  palette: VexThemeColorPalette;
}

export interface VexThemeAngularMaterialColorForeground {
  base: string;
  divider: string;
  dividers: string;
  disabled: string;
  'disabled-button': string;
  'disabled-text': string;
  elevation: string;
  'hint-text': string;
  'secondary-text': string;
  icon: string;
  icons: string;
  text: string;
  'slider-min': string;
  'slider-off': string;
  'slider-off-active': string;
}

export interface VexThemeAngularMaterialColorBackground {
  'status-bar': string;
  'app-bar': string;
  background: string;
  hover: string;
  card: string;
  dialog: string;
  'disabled-button': string;
  'raised-button': string;
  'focused-button': string;
  'selected-button': string;
  'selected-disabled-button': string;
  'disabled-button-toggle': string;
  'unselected-chip': string;
  'disabled-list-option': string;
  tooltip: string;
}

export interface VexThemeOptions {
  colors: {
    primary: VexThemeColorOptions;
    'on-primary': Omit<VexThemeColorOptions, 'defaults'>;
    accent: VexThemeColorOptions;
    'on-accent': Omit<VexThemeColorOptions, 'defaults'>;
    warn: VexThemeColorOptions;
    'on-warn': Omit<VexThemeColorOptions, 'defaults'>;
  };
  angularMaterial: {
    colors: {
      light: {
        foreground: VexThemeAngularMaterialColorForeground;
        background: VexThemeAngularMaterialColorBackground;
      };
      dark: {
        foreground: VexThemeAngularMaterialColorForeground;
        background: VexThemeAngularMaterialColorBackground;
      };
    };
  };
}

export interface VexThemes {
  default: VexThemeOptions;

  [themeName: string]: DeepPartial<VexThemeOptions>;
}

export interface VexThemePluginOptions {
  themes: VexThemes;
}

export default plugin.withOptions(
  (options: VexThemePluginOptions): PluginCreator => {
    return ({ theme, e, addComponents }: PluginAPI): void => {
      const themes = options.themes;

      for (let [themeName, partialThemeOptions] of Object.entries(themes)) {
        let themeOptions: VexThemeOptions;

        /**
         * Inherit default theme
         */
        if (themeName !== 'default') {
          themeOptions = inheritDefaultTheme(
            partialThemeOptions,
            themes.default
          );
        } else {
          themeOptions = partialThemeOptions as VexThemeOptions;
        }

        const themeComponents: CSSRuleObject = {};

        for (const [colorName, colorOptions] of Object.entries(
          themeOptions.colors
        )) {
          for (const [colorShade, colorValue] of Object.entries(
            colorOptions.palette
          )) {
            const colorVariableName = createColorVariableName(
              colorName,
              colorShade
            );

            themeComponents[colorVariableName] = chroma(colorValue)
              .rgb()
              .join(' ');
          }
        }

        const themeClassName = createThemeClassName(e(themeName));

        addComponents({
          [themeClassName]: themeComponents
        });

        /**
         * Generate color schemes for Angular Material
         */
        for (const [colorSchemeName, colorSchemeOptions] of Object.entries(
          themeOptions.angularMaterial.colors
        )) {
          const colorSchemeClassName = createColorSchemeClassName(
            colorSchemeName as 'light' | 'dark'
          );
          const angularMaterialColorSchemes: CSSRuleObject = {};

          for (const [
            colorSchemeSectionName,
            colorSchemeSectionOptions
          ] of Object.entries(colorSchemeOptions)) {
            for (const [
              colorSchemeComponentName,
              colorSchemeComponentColor
            ] of Object.entries(colorSchemeSectionOptions)) {
              const colorVariableName =
                createAngularMaterialComponentColorVariableName(
                  colorSchemeSectionName,
                  colorSchemeComponentName
                );
              angularMaterialColorSchemes[colorVariableName] =
                colorSchemeComponentColor;
              angularMaterialColorSchemes[colorVariableName + '-rgb'] = chroma(
                colorSchemeComponentColor
              )
                .rgb()
                .join(' ');
            }
          }

          addComponents({
            [`${themeClassName}${colorSchemeClassName}, ${themeClassName} ${colorSchemeClassName}`]:
              angularMaterialColorSchemes
          });
        }
      }

      generateScss(options);
    };
  },
  (options: VexThemePluginOptions): Partial<Config> => {
    const defaultTheme = options.themes.default;

    const colors: {
      [colorName: string]: VexThemeColorPalette;
    } = {};

    for (const [colorName, colorOptions] of Object.entries(
      defaultTheme.colors
    )) {
      colors[colorName] = {} as any;

      for (const colorShade of Object.keys(colorOptions.palette)) {
        const colorVariableName = createColorVariableName(
          colorName,
          colorShade
        );

        colors[colorName][
          colorShade
        ] = `rgb(var(${colorVariableName}) / <alpha-value>)`;
      }
    }

    return {
      theme: {
        extend: {
          colors: colors
        }
      }
    };
  }
);
