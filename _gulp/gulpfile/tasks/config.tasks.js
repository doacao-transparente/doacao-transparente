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
