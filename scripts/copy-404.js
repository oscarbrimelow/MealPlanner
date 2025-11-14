import { copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = join(__dirname, '..', 'dist')
const indexPath = join(distDir, 'index.html')
const notFoundPath = join(distDir, '404.html')

try {
  copyFileSync(indexPath, notFoundPath)
  console.log('✅ Copied index.html to 404.html for GitHub Pages routing')
} catch (error) {
  console.error('❌ Error copying 404.html:', error)
  process.exit(1)
}

