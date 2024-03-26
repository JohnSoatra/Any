import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./lib/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    minify: process.env.NODE_ENV === 'develop',
    injectStyle: JSON.parse(JSON.stringify({})),
    outDir: 'output'
})