import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Velan';
type PageModule = Record<string, ComponentType<any>> & {
  default?: ComponentType<any>;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  resolve: async name => {
    const normalized = name.replace(/\./g, '/');

    const possiblePaths = [
      `./pages/${normalized}.tsx`,
      `./pages/${normalized}/index.tsx`,
    ];

    for (const path of possiblePaths) {
      if (pages[path]) {
        const pageModule = await pages[path]();

        return pageModule.default || Object.values(pageModule)[0];
      }
    }

    throw new Error(`Page not found: ${name}`);
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#6B5FD1',
  },
});

// This will set light / dark mode on load...
initializeTheme();
