import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  base: '/music-game/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        game: 'game.html',
        select: 'select.html',
      },
    },
  },
});
