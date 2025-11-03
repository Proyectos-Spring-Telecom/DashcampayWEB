import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import addThemesPlugin, { VexThemes } from './src/@vex/tailwind/plugins/themes';
import addIconsPlugin from './src/@vex/tailwind/plugins/icons';
import chroma from 'chroma-js';
import { PluginUtils } from 'tailwindcss/types/config';
import addTypographyPlugin from '@tailwindcss/typography';

export const themes: VexThemes = {
  default: {
    colors: {
      primary: {
        defaults: {
          lighter: '100',
          default: '600',
          darker: '700'
        },
        palette: {
          ...colors.indigo
        }
      },
      'on-primary': {
        palette: {
          '50': colors.black,
          '100': colors.black,
          '200': colors.black,
          '300': colors.black,
          '400': colors.black,
          '500': colors.white,
          '600': colors.white,
          '700': colors.white,
          '800': colors.white,
          '900': colors.white
        }
      },
      accent: {
        defaults: {
          lighter: '100',
          default: '500',
          darker: '700'
        },
        palette: {
          ...colors.amber
        }
      },
      'on-accent': {
        palette: {
          '50': colors.black,
          '100': colors.black,
          '200': colors.black,
          '300': colors.black,
          '400': colors.black,
          '500': colors.white,
          '600': colors.white,
          '700': colors.white,
          '800': colors.white,
          '900': colors.white
        }
      },
      warn: {
        defaults: {
          lighter: '100',
          default: '500',
          darker: '700'
        },
        palette: {
          ...colors.red
        }
      },
      'on-warn': {
        palette: {
          '50': colors.black,
          '100': colors.black,
          '200': colors.black,
          '300': colors.black,
          '400': colors.black,
          '500': colors.white,
          '600': colors.white,
          '700': colors.white,
          '800': colors.white,
          '900': colors.white
        }
      }
    },
    angularMaterial: {
      colors: {
        light: {
          foreground: {
            base: colors.black,
            divider: chroma(colors.black).alpha(0.06).css(),
            dividers: chroma(colors.black).alpha(0.06).css(),
            disabled: colors.gray['500'],
            'disabled-button': colors.gray['400'],
            'disabled-text': colors.gray['500'],
            elevation: colors.black,
            'hint-text': colors.gray['500'],
            'secondary-text': colors.gray['600'],
            icon: colors.gray['800'],
            icons: colors.gray['800'],
            text: colors.gray['950'],
            'slider-min': colors.gray['800'],
            'slider-off': colors.gray['400'],
            'slider-off-active': colors.gray['500']
          },
          background: {
            'status-bar': colors.gray['300'],
            'app-bar': colors.gray['200'],
            background: colors.gray['100'],
            hover: chroma(colors.gray['900']).alpha(0.04).css(),
            card: colors.white,
            dialog: colors.white,
            'disabled-button': colors.gray['200'],
            'raised-button': colors.white,
            'focused-button': colors.gray['200'],
            'selected-button': colors.gray['300'],
            'selected-disabled-button': colors.gray['400'],
            'disabled-button-toggle': colors.gray['200'],
            'unselected-chip': colors.gray['300'],
            'disabled-list-option': colors.gray['200'],
            tooltip: colors.gray['800']
          }
        },
        dark: {
          foreground: {
            base: colors.white,
            divider: chroma(colors.white).alpha(0.12).css(),
            dividers: chroma(colors.white).alpha(0.12).css(),
            disabled: colors.gray['500'],
            'disabled-button': colors.gray['600'],
            'disabled-text': colors.gray['500'],
            elevation: colors.black,
            'hint-text': colors.gray['500'],
            'secondary-text': colors.gray['400'],
            icon: colors.white,
            icons: colors.white,
            text: colors.white,
            'slider-min': colors.white,
            'slider-off': colors.gray['600'],
            'slider-off-active': colors.gray['500']
          },
          background: {
            'status-bar': colors.gray['950'],
            'app-bar': colors.gray['800'],
            background: colors.gray['900'],
            hover: chroma(colors.white).alpha(0.04).css(),
            card: colors.gray['800'],
            dialog: colors.gray['800'],
            'disabled-button': chroma(colors.white).alpha(0.12).css(),
            'raised-button': colors.gray['800'],
            'focused-button': chroma(colors.white).alpha(0.12).css(),
            'selected-button': colors.gray['900'],
            'selected-disabled-button': colors.gray['800'],
            'disabled-button-toggle': colors.black,
            'unselected-chip': colors.gray['700'],
            'disabled-list-option': chroma(colors.white).alpha(0.12).css(),
            tooltip: colors.gray['700']
          }
        }
      }
    }
  },
  /**
   * All themes inherit from the default theme
   * You can add your own theme here and overwrite any values or just edit the default theme
   */
  teal: {
    colors: {
      primary: {
        palette: {
          ...colors.teal
        }
      }
    }
  },
  green: {
    colors: {
      primary: {
        palette: {
          ...colors.green
        }
      }
    }
  },
  purple: {
    colors: {
      primary: {
        palette: {
          ...colors.purple
        }
      }
    }
  },
  red: {
    colors: {
      primary: {
        palette: {
          ...colors.red
        }
      }
    }
  },
  orange: {
    colors: {
      primary: {
        palette: {
          ...colors.orange
        }
      }
    }
  }
};

export default {
  content: ['./src/**/*.{html,ts}'],
  important: ':root',
  darkMode: ['class', '.dark'],
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
    },
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent'
      },
      backgroundColor: {
        base: 'rgb(var(--vex-background-background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--vex-background-card-rgb) / <alpha-value>)',
        'app-bar': 'rgb(var(--vex-background-app-bar-rgb) / <alpha-value>)',
        hover: 'var(--vex-background-hover)'
      },
      borderColor: {
        DEFAULT: 'var(--vex-foreground-divider)',
        divider: 'var(--vex-foreground-divider)'
      },
      borderRadius: {
        none: '0px',
        xs: 'calc(var(--vex-border-radius) * 0.25)',
        sm: 'calc(var(--vex-border-radius) * 0.5)',
        DEFAULT: 'var(--vex-border-radius)',
        md: 'calc(var(--vex-border-radius) * 1.25)',
        lg: 'calc(var(--vex-border-radius) * 1.5)',
        xl: 'calc(var(--vex-border-radius) * 1.75)',
        '2xl': 'calc(var(--vex-border-radius) * 2)',
        full: '9999px',
        button: 'var(--vex-button-border-radius)'
      },
      boxShadow: {
        b: '0 10px 30px 0 rgba(82,63,104,.06)'
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        serif: ['Georgia', ...defaultTheme.fontFamily.serif],
        mono: ['Menlo', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      textColor: ({ colors }: PluginUtils) => ({
        default: 'rgb(var(--vex-foreground-text-rgb) / <alpha-value>)',
        secondary:
          'rgb(var(--vex-foreground-secondary-text-rgb) / <alpha-value>)',
        hint: 'rgb(var(--vex-foreground-hint-text-rgb) / <alpha-value>)'
      }),
      minWidth: ({ theme }: PluginUtils) => ({
        ...theme('spacing')
      }),
      maxWidth: ({ theme }: PluginUtils) => ({
        ...theme('spacing'),
        '3xs': '16rem',
        '2xs': '18rem'
      }),
      minHeight: ({ theme }: PluginUtils) => ({
        ...theme('spacing')
      }),
      maxHeight: ({ theme }: PluginUtils) => ({
        ...theme('spacing')
      }),
      transitionDuration: {
        400: '400ms'
      },
      transitionTimingFunction: {
        'out-swift': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
      }
    }
  },
  plugins: [
    addTypographyPlugin({
      target: 'modern'
    }),
    addThemesPlugin({ themes }),
    addIconsPlugin
  ],
  corePlugins: {
    container: false
  }
} satisfies Config;
