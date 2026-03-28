/**
 * GitHub Pages serves 404.html for unknown paths. Copying the built SPA shell
 * lets client-side routing work on hard refresh and deep links.
 */
const fs = require('node:fs')
const path = require('node:path')

const dist = path.join(__dirname, '..', 'dist')
const indexHtml = path.join(dist, 'index.html')
const notFoundHtml = path.join(dist, '404.html')

if (!fs.existsSync(indexHtml)) {
  console.error('copy-spa-404: dist/index.html not found. Run `npm run build:gh` first.')
  process.exit(1)
}

fs.copyFileSync(indexHtml, notFoundHtml)
console.log('copy-spa-404: wrote dist/404.html')
