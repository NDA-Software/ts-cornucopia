import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import indexer from "rollup-plugin-indexer";

export default [{
    input: 'src/index.ts',
    output: [{
        exports: 'named',
        preserveModules: true,
        interop: 'auto',
        dir: '.build/',
        format: 'esm'
    }],
    plugins: [
        indexer("./src"),
        typescript({
            tsconfig: 'tsconfig.json',
            outDir: '.build/',
            include: [
                './src/**/*.ts'
            ]
        }),
        peerDepsExternal(),
        nodeResolve(),
        commonjs()
    ]
},
{
    input: '.build/src/index.d.ts',
    output: [{ file: '.build/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/src/file/index.d.ts',
    output: [{ file: '.build/file/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/src/number/index.d.ts',
    output: [{ file: '.build/number/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/src/scripts/index.d.ts',
    output: [{ file: '.build/scripts/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/src/string/index.d.ts',
    output: [{ file: '.build/string/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: './.build/index.js',
    output: {
        file: './.temp/dummy.txt'
    },
    plugins: [
        del({ targets: '.build/src' })
    ],
    onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT')
            return false;

        warn(warning);
    }
}
];
