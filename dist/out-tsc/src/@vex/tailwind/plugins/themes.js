import plugin from 'tailwindcss/plugin';
import chroma from 'chroma-js';
import generateScss, { inheritDefaultTheme } from '../utils/generate-scss';
import { createAngularMaterialComponentColorVariableName, createColorSchemeClassName, createColorVariableName, createThemeClassName } from '../utils/naming';
export default plugin.withOptions((options) => {
    return ({ theme, e, addComponents }) => {
        const themes = options.themes;
        for (let [themeName, partialThemeOptions] of Object.entries(themes)) {
            let themeOptions;
            /**
             * Inherit default theme
             */
            if (themeName !== 'default') {
                themeOptions = inheritDefaultTheme(partialThemeOptions, themes.default);
            }
            else {
                themeOptions = partialThemeOptions;
            }
            const themeComponents = {};
            for (const [colorName, colorOptions] of Object.entries(themeOptions.colors)) {
                for (const [colorShade, colorValue] of Object.entries(colorOptions.palette)) {
                    const colorVariableName = createColorVariableName(colorName, colorShade);
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
            for (const [colorSchemeName, colorSchemeOptions] of Object.entries(themeOptions.angularMaterial.colors)) {
                const colorSchemeClassName = createColorSchemeClassName(colorSchemeName);
                const angularMaterialColorSchemes = {};
                for (const [colorSchemeSectionName, colorSchemeSectionOptions] of Object.entries(colorSchemeOptions)) {
                    for (const [colorSchemeComponentName, colorSchemeComponentColor] of Object.entries(colorSchemeSectionOptions)) {
                        const colorVariableName = createAngularMaterialComponentColorVariableName(colorSchemeSectionName, colorSchemeComponentName);
                        angularMaterialColorSchemes[colorVariableName] =
                            colorSchemeComponentColor;
                        angularMaterialColorSchemes[colorVariableName + '-rgb'] = chroma(colorSchemeComponentColor)
                            .rgb()
                            .join(' ');
                    }
                }
                addComponents({
                    [`${themeClassName}${colorSchemeClassName}, ${themeClassName} ${colorSchemeClassName}`]: angularMaterialColorSchemes
                });
            }
        }
        generateScss(options);
    };
}, (options) => {
    const defaultTheme = options.themes.default;
    const colors = {};
    for (const [colorName, colorOptions] of Object.entries(defaultTheme.colors)) {
        colors[colorName] = {};
        for (const colorShade of Object.keys(colorOptions.palette)) {
            const colorVariableName = createColorVariableName(colorName, colorShade);
            colors[colorName][colorShade] = `rgb(var(${colorVariableName}) / <alpha-value>)`;
        }
    }
    return {
        theme: {
            extend: {
                colors: colors
            }
        }
    };
});
//# sourceMappingURL=themes.js.map