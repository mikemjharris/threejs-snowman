// Builds the static site into dist/: the page, the game scripts concatenated
// in load order, the compiled stylesheet, images, and three.js and jQuery from
// node_modules. No bundler: the game is plain browser scripts sharing globals.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import * as sass from 'sass';

const gameScripts = [
  'snowman.js',
  'arena.js',
  'tree.js',
  'forest.js',
  'snow.js',
  'mammal-cube.js',
  'explosion.js',
  'snowball.js',
  'player.js',
  'camera.js',
  'game.js',
  'snowman_game.js',
];

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/vendor', { recursive: true });

cpSync('index.html', 'dist/index.html');
cpSync('public/images', 'dist/images', {
  recursive: true,
  filter: (src) => !src.endsWith('.xcf'), // GIMP sources, not needed on the site
});
cpSync('node_modules/three/three.min.js', 'dist/vendor/three.min.js');
cpSync('node_modules/jquery/dist/jquery.min.js', 'dist/vendor/jquery.min.js');

const game = gameScripts
  .map((file) => `// ${file}\n${readFileSync(`public/javascripts/${file}`, 'utf8')}`)
  .join('\n');
writeFileSync('dist/snowman-game.js', game);

writeFileSync('dist/canvas_game.css', sass.compile('public/stylesheets/canvas_game.scss').css);

console.log('built dist/');
