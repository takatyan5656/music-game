import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  base: '/music-game/',
  build: {
    rollupOptions: {
      input: {
        main: 'public/index.html',
        game: 'public/game.html',
        select: 'public/select.html',
      },
    },
  },
});
