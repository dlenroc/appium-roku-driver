import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [
    'fs/promises',
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies)
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    terser()
  ],
};
