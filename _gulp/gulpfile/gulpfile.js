const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const foreach = require('gulp-foreach');
const fs = require('fs');
const groupcmq = require('gulp-group-css-media-queries');
const hjson = require('hjson');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const rollbabel = require('rollup-plugin-babel');
const rolluglify = require('rollup-plugin-uglify');
const util = require('gulp-util');

require('hjson/lib/require-config');

const gulpPath = requireJson('./_gulp/config/paths.hjson');
const gulpConf = {
	sass: requireJson('./_gulp/config/sass.hjson'),
	js: requireJson('./_gulp/config/js.hjson'),
	img: requireJson('./_gulp/config/image.hjson')
};

// eslint-disable-next-line spaced-comment
//@include globed

gulp.task('default',
	gulp.series(
		'config:default',
		'sass:default',
		'js:default',
		'image:default',
		'vendor:default',
		'app:default',
		'watch:default'
	)
);

gulp.task('export',
	gulp.series(
		'config:default',
		'sass:default',
		'js:default',
		'image:default',
		'vendor:default',
		'app:default'
	)
);
