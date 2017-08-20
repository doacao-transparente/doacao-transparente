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
