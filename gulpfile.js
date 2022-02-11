/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-syntax */
const gulp = require('gulp');

const files = ['./node_modules/.prisma/**/*'];

const applications = ['dist'];

gulp.task('copy:modules', async () => {
  applications.map(item => gulp.src(files, { base: './' }).pipe(gulp.dest(`infrastructure/${item}/.prisma`)));
});
