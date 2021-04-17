import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import generatePackageJson from "rollup-plugin-generate-package-json";
import gitVersion from "git-tag-version";
import pkg from "./package.json";

const tag = gitVersion();

export default {
  input: "src/gatsby-node.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
    terser(),
    copy({
      targets: [{ src: ["LICENSE", "README.md"], dest: "dist" }],
    }),
    generatePackageJson({
      baseContents: (pkg) => ({
        name: pkg.name,
        description: pkg.description,
        version: tag,
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
};
