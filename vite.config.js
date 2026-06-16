import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import nunjucks from 'vite-plugin-nunjucks';

function loadSiteData() {
    return JSON.parse(readFileSync('./data/site.json', 'utf-8'));
}

export default defineConfig({
    base: './',
    appType: 'mpa',
    publicDir: 'public',
    plugins: [
        nunjucks({
            templatesDir: '.',
            variables: { '*': loadSiteData() }
        }),
        {
            name: 'dev-server-config',
            configureServer(server) {
                server.middlewares.use((req, _res, next) => {
                    if (req.url.endsWith('/') && !req.url.includes('.')) {
                        req.url = req.url + 'index.html';
                    }
                    next();
                });
            },
            handleHotUpdate({ file, server }) {
                if (file.includes('data/site.json') || file.endsWith('index.html')) {
                    server.ws.send({ type: 'full-reload' });
                }
            }
        }
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        },
        outDir: 'dist'
    }
});
