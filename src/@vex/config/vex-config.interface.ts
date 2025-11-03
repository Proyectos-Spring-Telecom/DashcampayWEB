import { CSSValue } from '../interfaces/css-value.type';

export enum VexTheme {
  DEFAULT = 'vex-theme-default',
  TEAL = 'vex-theme-teal'
}

export enum VexConfigName {
  apollo = 'apollo',
  zeus = 'zeus',
  hermes = 'hermes',
  poseidon = 'poseidon',
  ares = 'ares',
  ikaros = 'ikaros'
}

export enum VexColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface VexConfig {
  id: VexConfigName;
  name: string;
  bodyClass: string;
  imgSrc: string;
  direction: 'ltr' | 'rtl';
  style: {
    themeClassName: string;
    colorScheme: VexColorScheme;
    borderRadius: CSSValue;
    button: {
      borderRadius: CSSValue | undefined;
    };
  };
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    showCollapsePin: boolean;
    user: {
      visible: boolean;
    };
    search: {
      visible: boolean;
    };
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
    user: {
      visible: boolean;
    };
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}

export type VexConfigs = Record<VexConfigName, VexConfig>;

export interface VexThemeProvider {
  name: string;
  className: string;
}
