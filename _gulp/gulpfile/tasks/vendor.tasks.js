
gulp.task('vendor:copy', () => {
	return gulp.src(gulpPath.vendor)
		.pipe(gulp.dest(gulpPath.dist));
});

gulp.task('vendor:default',
	gulp.series(
		'vendor:copy'
	)
);
