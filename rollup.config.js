import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json';

export default {
  input: 'src/gatsby-node.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript(),
    terser(),
    copy({
      targets: [{ src: ['LICENSE', 'README.md'], dest: 'dist' }],
    }),
    generatePackageJson({
      baseContents: pkg => ({
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        main: pkg.main.replace('dist/', ''),
        types: pkg.main.replace('dist/', ''),
        author: pkg.author,
        license: pkg.license,
        repository: pkg.repository,
        keywords: pkg.keywords,
        bugs: pkg.bugs,
        homepage: pkg.homepage,
      }),
      additionalDependencies: ['gatsby'],
    }),
  ],
};
