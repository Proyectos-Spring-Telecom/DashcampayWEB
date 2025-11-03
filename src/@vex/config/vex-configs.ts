import { mergeDeep } from '../utils/merge-deep';
import {
  VexColorScheme,
  VexConfig,
  VexConfigName,
  VexConfigs,
  VexTheme
} from './vex-config.interface';
import deepClone from '@vex/utils/deep-clone';

const baseConfig: VexConfig = {
  id: VexConfigName.apollo,
  name: 'Apollo',
  bodyClass: 'vex-layout-apollo',
  style: {
    themeClassName: VexTheme.DEFAULT,
    colorScheme: VexColorScheme.LIGHT,
    borderRadius: {
      value: 0.5,
      unit: 'rem'
    },
    button: {
      borderRadius: {
        value: 9999,
        unit: 'px'
      }
    }
  },
  direction: 'ltr',
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/apollo.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    title: 'VEX',
    imageUrl: 'assets/img/logo/logo.svg',
    showCollapsePin: true,
    user: {
      visible: true
    },
    search: {
      visible: true
    },
    state: 'expanded'
  },
  toolbar: {
    fixed: true,
    user: {
      visible: true
    }
  },
  navbar: {
    position: 'below-toolbar'
  },
  footer: {
    visible: true,
    fixed: true
  }
};

export const vexConfigs: VexConfigs = {
  apollo: baseConfig,
  poseidon: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.poseidon,
    name: 'Poseidon',
    bodyClass: 'vex-layout-poseidon',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/poseidon.png',
    sidenav: {
      user: {
        visible: true
      },
      search: {
        visible: true
      }
    },
    toolbar: {
      user: {
        visible: false
      }
    }
  }),
  hermes: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.hermes,
    name: 'Hermes',
    bodyClass: 'vex-layout-hermes',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/hermes.png',
    layout: 'vertical',
    boxed: true,
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    footer: {
      fixed: false
    }
  }),
  ares: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.ares,
    name: 'Ares',
    bodyClass: 'vex-layout-ares',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  }),
  zeus: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.zeus,
    name: 'Zeus',
    bodyClass: 'vex-layout-zeus',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/zeus.png',
    sidenav: {
      state: 'collapsed'
    }
  }),
  ikaros: mergeDeep(deepClone(baseConfig), {
    id: VexConfigName.ikaros,
    name: 'Ikaros',
    bodyClass: 'vex-layout-ikaros',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ikaros.png',
    layout: 'vertical',
    boxed: true,
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  })
};
