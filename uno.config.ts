// uno.config.ts
import { defineConfig, presetWind } from 'unocss';

export default defineConfig({
  presets: [
    presetWind({
      prefix: 'tw-',
    }),
  ],
  theme: {
    colors: {
      primary: '#18181b',
      'primary-night': '#09090b',
      secondary: '#e8e8e9',
      'secondary-night': '#fafafa',
      third: '#27272a',
      t_blue: '#316dbe',
    },
  },
  rules: [],
});
