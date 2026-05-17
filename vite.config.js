import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { imageSize } from 'image-size';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const VIRTUAL_ID = 'virtual:gallery-images';
const RESOLVED_ID = '\0virtual:gallery-images';

function galleryImagesPlugin() {
  return {
    name: 'gallery-images',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const dir = resolve(__dirname, 'public/pic');
      const images = existsSync(dir)
        ? readdirSync(dir)
            .filter(f => IMAGE_EXT.test(f))
            .map(f => {
              const { width = 4, height = 3 } = imageSize(readFileSync(resolve(dir, f)));
              return { url: encodeURI('/pic/' + f), width, height };
            })
        : [];
      return `export default ${JSON.stringify(images)};`;
    },
    configureServer(server) {
      const dir = resolve(__dirname, 'public/pic');
      server.watcher.add(dir);
      server.watcher.on('all', (event, file) => {
        if (file.startsWith(dir + '/') || file === dir) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [galleryImagesPlugin(), react()],
  test: {
    environment: 'node',
    include: ['api/__tests__/**/*.test.js'],
  },
});
