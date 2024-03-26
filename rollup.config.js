import dotenv from 'dotenv';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

dotenv.config();

const developMode = process.env.NODE_ENV === 'develop';

export default [
    {
        input: "lib/index.ts",
        output: [
        {
            file: 'dist/index.js',
            format: "cjs",
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.mjs',
            format: "esm",
            sourcemap: true,
        },
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig.json' }),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**'
            }),
            postcss(),
            ...(developMode ? [] : [terser()]),
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "lib/index.ts",
        output: [
            {
                file: "dist/index.d.mts",
                format: "es"
            },
        ],
        plugins: [
            dts()
        ],
        external: [/\.css$/],
    },
];