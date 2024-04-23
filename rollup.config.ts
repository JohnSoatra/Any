import dotenv from 'dotenv';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';
import { defineConfig } from 'rollup';

dotenv.config();

const developMode = process.env.NODE_ENV === 'develop'; 

const options = defineConfig([
    {
        input: "src/exports.ts",
        output: [
            {
                file: 'dist/index.js',
                format: "cjs",
                exports: 'named',
                banner: `'use client';`
            },
            {
                file: 'dist/index.mjs',
                format: "esm",
                banner: `'use client';`
            },
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
            }),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            postcss(),
            ...(developMode ? [] : [terser()]),
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "src/exports.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "es"
            },
        ],
        plugins: [
            dts(),
            del({
                targets: [
                    'dist/App.d.ts',
                    'dist/exports.d.ts',
                    'dist/types.d.ts'
                ]
            })
        ],
        external: [/\.css$/],
    },
]);

export default options;