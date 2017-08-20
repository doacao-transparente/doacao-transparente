const glob = require('glob');
const fs = require('fs');

let gulpfile = fs.readFileSync('_gulp/gulpfile/gulpfile.js', 'utf8');
let concat = '';

glob.sync('_gulp/gulpfile/tasks/**/*.js').map((e) => {
	concat += fs.readFileSync(e, 'utf8');
});

gulpfile = gulpfile.replace('//@include globed', concat);

fs.writeFileSync('./gulpfile.js', gulpfile, 'utf8');
