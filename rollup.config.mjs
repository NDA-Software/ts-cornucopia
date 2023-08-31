import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

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
        typescript({
            tsconfig: 'tsconfig.json',
            declarationDir: '.build/types/',
            include: [
                './src/**/*.ts'
            ]
        }),
        peerDepsExternal(),
        nodeResolve(),
        commonjs()
    ]
}, {
    input: '.build/types/index.d.ts',
    output: [{ file: '.build/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/types/file/index.d.ts',
    output: [{ file: '.build/file/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/types/number/index.d.ts',
    output: [{ file: '.build/number/index.d.ts', format: 'esm' }],
    plugins: [dts()]
},
{
    input: '.build/types/string/index.d.ts',
    output: [{ file: '.build/string/index.d.ts', format: 'esm' }],
    plugins: [
        dts()
    ]
},
{
    input: './.build/index.js',
    output: {
        file: './.temp/dummy.txt'
    },
    plugins: [
        del({ targets: '.build/types' })
    ],
    onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT')
            return false;

        warn(warning);
    }
}
];
