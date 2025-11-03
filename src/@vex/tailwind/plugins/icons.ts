import plugin from 'tailwindcss/plugin';
import { PluginAPI } from 'tailwindcss/types/config';

export default plugin(({ addUtilities }: PluginAPI): void => {
  addUtilities({
    '.icon-xs, .icon-xs svg': {
      'font-size': '1rem',
      height: '1rem',
      width: '1rem',
      'line-height': '1rem'
    },
    '.icon-sm, .icon-sm svg': {
      'font-size': '1.25rem',
      height: '1.25rem',
      width: '1.25rem',
      'line-height': '1.25rem'
    },
    '.icon-base, .icon-base svg': {
      'font-size': '1.5rem',
      height: '1.5rem',
      width: '1.5rem',
      'line-height': '1.5rem'
    },
    '.icon-lg, .icon-lg svg': {
      'font-size': '1.75rem',
      height: '1.75rem',
      width: '1.75rem',
      'line-height': '1.75rem'
    },
    '.icon-xl, .icon-xl svg': {
      'font-size': '2rem',
      height: '2rem',
      width: '2rem',
      'line-height': '2rem'
    },
    '.icon-2xl, .icon-2xl svg': {
      'font-size': '2.25rem',
      height: '2.25rem',
      width: '2.25rem',
      'line-height': '2.25rem'
    },
    '.icon-3xl, .icon-3xl svg': {
      'font-size': '2.5rem',
      height: '2.5rem',
      width: '2.5rem',
      'line-height': '2.5rem'
    },
    '.icon-4xl, .icon-4xl svg': {
      'font-size': '2.75rem',
      height: '2.75rem',
      width: '2.75rem',
      'line-height': '2.75rem'
    },
    '.icon-5xl, .icon-5xl svg': {
      'font-size': '3rem',
      height: '3rem',
      width: '3rem',
      'line-height': '3rem'
    }
  });
});
