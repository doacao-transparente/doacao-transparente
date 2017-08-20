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
