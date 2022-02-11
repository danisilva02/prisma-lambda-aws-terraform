const artifactOutputPath = 'infrastructure/dist';

require('esbuild')
  .build({
    entryPoints: ['src/main/lambda.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: `${artifactOutputPath}/main.js`,
    platform: 'node',
    target: 'node14'
  })
  .then(() => {
    console.log('Build successfully');
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
