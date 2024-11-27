import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: "./",
  server: {
    open: '/question.html',
    // open: '/online.html',
    // open: '/manabi.html',
    // open: '/invalid.html',
  },
  build: {
		rollupOptions: {
			input: {
        question: resolve('question.html'),
        online: resolve('online.html'),
        manabi: resolve('manabi.html'),
        invalid: resolve('invalid.html'),
			}
		}
	}
})
