
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
