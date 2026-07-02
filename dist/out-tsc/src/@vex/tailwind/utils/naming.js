export function createThemeClassName(themeName) {
    return `.vex-theme-${themeName}`;
}
export function createColorSchemeClassName(colorScheme) {
    return `.${colorScheme}`;
}
export function createColorVariableName(colorName, colorShade) {
    return `--vex-color-${colorName}-${colorShade}`;
}
export function createAngularMaterialComponentColorVariableName(sectionName, componentName) {
    return `--vex-${sectionName}-${componentName}`;
}
//# sourceMappingURL=naming.js.map