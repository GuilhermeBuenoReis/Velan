import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
type PageModule = Record<string, ComponentType<any>> & {
  default?: ComponentType<any>;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  resolve: async name => {
    const pageImport = pages[`./pages/${name}.tsx`];

    if (!pageImport) {
      throw new Error(`Page not found: ${name}`);
    }

    const page = await pageImport();

    if (page.default) {
      return page.default;
    }

    const namedExports = Object.entries(page)
      .filter(([key]) => key !== 'default')
      .map(([, component]) => component);

    if (namedExports.length === 0) {
      throw new Error(`No exports found for page: ${name}`);
    }

    return namedExports[0];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
