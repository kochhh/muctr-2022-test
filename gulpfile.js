// common
const gulp = require('gulp')
const del = require('del')
const mode = require('gulp-mode')()
const debug = require('gulp-debug')
const plumber = require('gulp-plumber')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const strip = require('gulp-strip-comments')
const browsersync = require('browser-sync')

// html
const pug = require('gulp-pug')
const htmlbeautify = require('gulp-html-beautify')
const groupmedia = require('gulp-group-css-media-queries')

// styles
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')

// scripts
const uglify = require('gulp-uglify')
const jsbeautifier = require('gulp-jsbeautifier')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const rollup = require('@rollup/stream')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')

// images
const svg = require('gulp-svg-sprite')

const paths = {
  html: {
    src: [
      './src/views/*.pug'
    ],
    dist: './dist',
    watch: [
      './src/blocks/**/*.pug',
      './src/views/**/*.pug'
    ]
  },
  styles: {
    src: './src/styles/main.scss',
    dist: './dist/css',
    watch: [
      './src/blocks/**/*.scss',
      './src/styles/**/*.scss'
    ]
  },
  scripts: {
    src: './src/js/main.js',
    dist: './dist/js',
    watch: [
      './src/blocks/**/*.js',
      './src/js/**/*.js'
    ],
    libs: [
      './src/js/vendor/modernizr.js', // 4
      './src/js/vendor/phoneinput.js', // 3
      './bootstrap/dist/js/bootstrap.bundle.min.js', // 59
      './swiper/dist/swiper-bundle.js', // 104
      './node_modules/glightbox/dist/js/glightbox.js', // 56
      './node_modules/lazysizes/lazysizes.js', // 8
      './node_modules/gsap/dist/gsap.js', // 72
      './node_modules/gsap/dist/ScrollTrigger.js', // 43
    ]
  },
  images: {
    src: [
      './src/img/**/*.{jpg,jpeg,png,gif,webp,svg,avif}',
      '!./src/img/favicons/*.*'
    ],
    dist: './dist/i',
    watch: [
      './src/img/**/*.{jpg,jpeg,png,gif,webp,svg,avif}',
      '!./src/img/favicons/*.*',
      '!./src/img/_src/*.*',
      '!./src/img/**/_src/*.*'
    ]
  },
  favicons: {
    src: './src/img/favicons/*.*',
    dist: './dist',
    watch: './src/img/favicons/*.*'
  },
  sprites: {
    src: './src/img/svg/**/*.svg',
    dist: './dist/i/sprites',
    watch: './src/img/svg/**/*.svg'
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2}',
    dist: './dist/fonts',
    watch: './src/fonts/**/*.{woff,woff2}'
  },
}

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(pug({
      pretty: true,
      doctype: 'html'
    }))
    .pipe(htmlbeautify({ indent_size: 4 }))
    .pipe(mode.production(replace('main.css', 'main.min.css')))
    // .pipe(mode.production(replace('libs.js', 'libs.min.js')))
    .pipe(mode.production(replace('main.js', 'main.min.js')))
    .pipe(gulp.dest(paths.html.dist))
    .pipe(debug({ title: 'HTML' }))
    .pipe(browsersync.stream())
})

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 4
    }))
    .pipe(postcss([
      require('autoprefixer')({ cascade: false }),
      require('postcss-easing-gradients')
    ]))
    .pipe(groupmedia())
    .pipe(mode.production(purgecss({
      content: [
        'dist/*.html',
        'dist/js/*.js'
      ],
      safelist: {
        greedy: [
          /^col-/,
          /^fade/,
          /^show/,
          /^collapsing/,
          /^navbar/,
          /^popover/,
          /^dropdown/,
          /^modal-backdrop/,
          /^swiper/,
          /^glightbox/,
          /^gcontainer/,
          /^gslide/,
          /^ginner/,
          /^ginlined/,
          /^gdesc/,
          /^greset/,
          /^gabsolute/,
          /^grelative/,
          /^gloader/,
          /^goverlay/,
          /^gprev/,
          /^gnext/,
          /^gclose/,
          /^gbtn/,
          /^wait-autoplay/,
          /^gfade/,
          /^gslide/,
          /^gzoom/,
          /^no-customproperties/,
          /^no-webp/,
          /^no-avif/,
          /^mobile/,
          /^safari/,
          /^calc-add-list/,
          /^is-scrolled/,
        ]
      }
    })))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(mode.production(postcss([
      require('postcss-csso')
    ])))
    .pipe(mode.production(rename({ suffix: '.min' })))
    .pipe(plumber.stop())
    .pipe(mode.development(sourcemaps.write('./maps/')))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(debug({ title: 'CSS files' }))
    .pipe(browsersync.stream())
})

gulp.task('libs', () => {
  return gulp.src(paths.scripts.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(uglify())
    .pipe(mode.production(strip()))
    .pipe(mode.production(rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(debug({ title: 'JS libs' }))
})

let cache

gulp.task('scripts', () => {
  return rollup({
    input: paths.scripts.src,
    plugins: [
      nodeResolve.nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      babel.babel({
        presets: ['@babel/preset-env'],
        babelHelpers: 'bundled',
      }),
    ],
    cache: cache,
    output: { format: 'iife' },
  })
    .on('bundle', function(bundle) {
      cache = bundle
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(mode.production(jsbeautifier({
      js: {
        indent_char: ' ',
        indent_size: 4
      }
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(mode.production(uglify()))
    .pipe(mode.production(rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(debug({ title: 'JS files' }))
    .on('end', browsersync.reload)
})

gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dist))
    .pipe(debug({ title: 'Images' }))
    .on('end', browsersync.reload)
})

gulp.task('favicons', () => {
  return gulp.src(paths.favicons.src)
    .pipe(gulp.dest(paths.favicons.dist))
    .pipe(debug({ title: 'Favicons' }))
    .on('end', browsersync.reload)
})

gulp.task('sprites', () => {
  return gulp.src(paths.sprites.src)
    .pipe(svg({
      shape: {
        dest: 'intermediate-svg'
      },
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(paths.sprites.dist))
    .pipe(debug({ title: 'Sprites' }))
    .on('end', browsersync.reload);
})

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(debug({ title: 'Fonts' }))
    .on('end', browsersync.reload)
})

gulp.task('clean', () => {
  return del(['./dist/*'])
})

gulp.task('serve', () => {
  browsersync.init({
    server: './dist/',
    port: 4000,
    notify: false,
    open: false
  })

  gulp.watch(paths.html.watch, gulp.series('html'))
  gulp.watch(paths.styles.watch, gulp.series('styles'))
  gulp.watch(paths.scripts.watch, gulp.series('scripts'))
  gulp.watch(paths.images.watch, gulp.series('images'))
  gulp.watch(paths.favicons.watch, gulp.series('favicons'))
  gulp.watch(paths.sprites.watch, gulp.series('sprites'))
  gulp.watch(paths.fonts.watch, gulp.series('fonts'))
})

gulp.task('dev', gulp.series(
  'clean',
  gulp.series([ 'html', 'styles', 'libs', 'scripts', 'images', 'favicons', 'sprites', 'fonts' ]),
  gulp.parallel('serve')
))

gulp.task('build', gulp.series(
  'clean',
  gulp.series([ 'html', 'styles', 'libs', 'scripts', 'images', 'favicons', 'sprites', 'fonts' ])
))
