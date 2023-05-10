import {defineConfig} from 'tsup'

export default defineConfig({
	dts: true,
	clean: true,
	// minify: true,
	splitting: true,
	outDir: 'dist',
	format: ['cjs', 'esm', 'iife'],
	entry: ['./src/index.ts'],
	noExternal: ['slash']
	/* outExtension(e) {
		console.log(e)
		return {
			js: `.${e.format}.js`
		}
	} */
})
