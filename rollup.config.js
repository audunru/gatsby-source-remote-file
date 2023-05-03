import esbuild from "rollup-plugin-esbuild";
import copy from "rollup-plugin-copy";
import generatePackageJson from "rollup-plugin-generate-package-json";
import pkg from "./package.json" assert { type: "json" };
import { defineConfig } from "rollup";

const rollupConfig = defineConfig({
  input: "src/gatsby-node.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    esbuild(),
    copy({
      targets: [{ src: ["LICENSE", "README.md"], dest: "dist" }],
    }),
    generatePackageJson({
      baseContents: (pkg) => ({
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        main: pkg.main.replace("dist/", ""),
        types: pkg.types.replace("dist/", ""),
        author: pkg.author,
        license: pkg.license,
        repository: pkg.repository,
        keywords: pkg.keywords,
        bugs: pkg.bugs,
        homepage: pkg.homepage,
        peerDependencies: pkg.peerDependencies,
      }),
    }),
  ],
});

export default rollupConfig;
