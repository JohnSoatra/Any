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
        input: "src/exports/default.ts",
        output: [
            {
                file: 'dist/index.js',
                format: "cjs",
                banner: `'use client';`,
                exports: 'named',
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
            ...(developMode ? [] : [terser({
                compress: {
                    directives: false
                }  
            })]),
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "src/exports/default.ts",
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
                    'dist/*'
                ],
                ignore: [
                    'dist/index.js',
                    'dist/index.mjs',
                ],
            })
        ]
    },

    {
        input: "src/exports/static.ts",
        output: [
            {
                file: 'dist/static/index.js',
                format: "cjs",
            },
            {
                file: 'dist/static/index.mjs',
                format: "esm",
            },
        ],
        external: ["react", "react-dom"],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
            }),
            resolve(),
            commonjs(),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            postcss(),
            ...(developMode ? [] : [terser()]),
        ]
    },
    {
        input: "src/exports/static.ts",
        output: [
            {
                file: "dist/static/index.d.ts",
                format: "es"
            },
        ],
        plugins: [
            dts(),
            del({
                targets: [
                    'dist/static/*'
                ],
                ignore: [
                    'dist/static/index.js',
                    'dist/static/index.mjs',
                ]
            })
        ]
    },
]);

export default options;