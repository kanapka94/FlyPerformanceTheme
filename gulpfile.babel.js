import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'

const paths = {
  styles: {
    src: 'assets/scss/**/*.scss',
    dest: './'
  },
  scripts: {
    src: 'assets/js/**/*.js',
    dest: 'assets/scripts/'
  }
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}


function watchFiles() {
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.styles.src, styles)
}
export { watchFiles as watch }

const build = gulp.parallel(styles, scripts)
gulp.task('build', build)

export default build