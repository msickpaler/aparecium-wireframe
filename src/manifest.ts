import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'aparecium-wireframe',
  description: '',
  version: '0.0.0.1',
  manifest_version: 3,
  icons: {
    '16': 'img/Vector@16.png',
    '32': 'img/Vector@34.png',
    '48': 'img/Vector@48.png',
    '128': 'img/Vector@128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/Vector@48.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/Vector@16.png',
        'img/Vector@34.png',
        'img/Vector@48.png',
        'img/Vector@128.png',
      ],
      matches: [],
    },
  ],
  permissions: ['activeTab', 'scripting'],
})
