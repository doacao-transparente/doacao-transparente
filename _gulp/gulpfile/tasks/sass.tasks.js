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
