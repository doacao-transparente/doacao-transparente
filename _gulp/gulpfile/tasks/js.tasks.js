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
