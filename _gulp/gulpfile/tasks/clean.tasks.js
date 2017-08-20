gulp.task('clean:dist', (done) => {
	del.sync([gulpPath.dist + '/*']);
	done();
});

gulp.task('clean',
	gulp.series(
		'clean:dist'
	)
);
