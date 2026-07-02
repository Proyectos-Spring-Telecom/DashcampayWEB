import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import config from 'devextreme/core/config';
import { locale } from 'devextreme/localization';
import { provideAnimations } from '@angular/platform-browser/animations';
locale('es-MX'); // o 'es'
async function getLicenseKey() {
    try {
        // 👇 Import dinámico: no rompe el build si el archivo no existe
        const mod = await import('./devextreme-license');
        return mod.licenseKey ?? '';
    }
    catch {
        console.warn('DevExtreme: devextreme-license.ts no encontrado. Usando licencia vacía.');
        return '';
    }
}
(async () => {
    const key = await getLicenseKey();
    config({ licenseKey: key });
    await bootstrapApplication(AppComponent, {
        ...appConfig,
        providers: [
            ...(appConfig.providers || []),
            provideAnimations(),
        ],
    });
})();
//# sourceMappingURL=main.js.map