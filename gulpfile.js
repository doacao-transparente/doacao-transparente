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

gulp.task('app:compress', () => {
	return gulp.src(gulpPath.application.export)
		.pipe(foreach((stream, file) => {
			if ((file.path.indexOf('.js') > -1) && (file.path.indexOf('.json') === -1)) {
				stream.pipe(babel(gulpConf.js.application.babel))
					.on('error', (e) => {
						console.log(e.message);
						console.log(e.loc);
					});
			}

			return stream;
		}))
		.pipe(gulp.dest(gulpPath.dist));
});

gulp.task('app:default',
	gulp.series(
		'app:compress'
	)
);
gulp.task('clean:dist', (done) => {
	del.sync([gulpPath.dist + '/*']);
	done();
});

gulp.task('clean',
	gulp.series(
		'clean:dist'
	)
);
gulp.task('config:check:dist', (done) => {
	let isDir;

	try {
		isDir = fs.fstatSync(gulpPath.dist).isDirectory();
	}
	catch (err) {
		isDir = false;
	}

	if (!isDir) {
		try {
			fs.mkdirSync(gulpPath.dist);
		}
		catch (err) {}
	}
	done();
});

gulp.task('config:default',
	gulp.series(
		'config:check:dist'
	)
);
gulp.task('image:render', () => {
	let imageMinConfig = {
		use: [imagemin.jpegtran(gulpConf.img.jpegtran)]
	};

	return gulp.src(gulpPath.img.export)
		.pipe(newer(gulpPath.dist + gulpPath.img.dist))
		.pipe(imagemin(imageMinConfig))
		.pipe(gulp.dest(gulpPath.dist + gulpPath.img.dist));
});

gulp.task('image:default',
	gulp.series(
		'image:render'
	)
);
gulp.task('js:rollup', () => {
	return gulp.src(gulpPath.js.rollup.export)
		.pipe(process.env.NODE_ENV === 'development' ? sourcemaps.init() : util.noop())
		.pipe(rollup(
			{
				plugins: [
					rollbabel(gulpConf.js.rollup.babel),
					rolluglify()
				]
			},
			{
				format: 'iife'
			}
		))
		.on('error', (e) => {
			console.log(e.message);
			console.log(e.loc);
		})
		.pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('') : util.noop())
		.pipe(rename((file) => {
			file.dirname = file.dirname.replace('views', '');
		}))
		.pipe(gulp.dest(gulpPath.dist + gulpPath.js.dist))
		.on('error', (e) => {
			console.log(e.message);
			console.log(e.loc);
		});
});

gulp.task('js:copy', () => {
	return gulp.src(gulpPath.js.common.watch)
		.pipe(gulp.dest(gulpPath.dist + gulpPath.js.dist));
});

gulp.task('js:default',
	gulp.series(
		'js:rollup',
		'js:copy'
	)
);
function requireJson($path) {
	let answer = {};

	try {
		delete require.cache[require.resolve($path)];
	}
	catch (err) {
		console.log(err);
	}

	try {
		answer = require($path);
	}
	catch (err) {
		console.log(err);
	}

	return answer;
}
gulp.task('sass:render', () => {
	return gulp.src(gulpPath.sass.export)
		.pipe(sass(gulpConf.sass.development).on('error', sass.logError))
		.pipe(groupcmq()
			.on('error', (e) => {
				console.log(e.message);
				console.log(e.loc);
			})
		)
	// .pipe(sass(gulpConf.sass.development).on('error', sass.logError))
		.pipe(sass(gulpConf.sass.production).on('error', sass.logError))
		.pipe(rename((file) => {
			file.dirname = file.dirname
				.split('scss').join('css')
				.split('sass').join('css');
		}))
		.pipe(gulp.dest(gulpPath.dist + gulpPath.sass.dist));
});

gulp.task('css:copy', () => {
	return gulp.src(gulpPath.css.export)
		.pipe(gulp.dest(gulpPath.dist + gulpPath.sass.dist));
});

gulp.task('sass:default',
	gulp.series(
		'sass:render',
		'css:copy'
	)
);

gulp.task('vendor:copy', () => {
	return gulp.src(gulpPath.vendor)
		.pipe(gulp.dest(gulpPath.dist));
});

gulp.task('vendor:default',
	gulp.series(
		'vendor:copy'
	)
);
gulp.task('watch:sass', (done) => {
	gulp.watch(gulpPath.sass.watch, gulp.series('sass:render'));
	gulp.watch(gulpPath.css.watch, gulp.series('css:copy'));
	done();
});

gulp.task('watch:js', (done) => {
	gulp.watch(gulpPath.js.common.watch, gulp.series('js:copy'));
	gulp.watch(gulpPath.js.rollup.watch, gulp.series('js:rollup'));
	done();
});

gulp.task('watch:image', (done) => {
	gulp.watch(gulpPath.img.process, gulp.series('image:render'));
	done();
});

gulp.task('watch:vendor', (done) => {
	gulp.watch(gulpPath.vendor, gulp.series('vendor:copy'));
	done();
});

gulp.task('watch:application', (done) => {
	gulp.watch(gulpPath.application.watch, gulp.series('app:compress'));
	done();
});

gulp.task('watch:default',
	gulp.series(
		'watch:sass',
		'watch:js',
		'watch:image',
		'watch:application'
	)
);


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
