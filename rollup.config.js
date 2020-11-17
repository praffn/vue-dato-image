import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const baseConfig = {
  input: "src/entry.js",
};

const basePluginConfig = {
  vue: { template: { isProduction: true } },
  babel: {
    exclude: "node_modules/**",
    extensions: [".js", ".vue"],
  },
};

const external = ["vue"];

const globals = {
  vue: "Vue",
};

const esmConfig = {
  ...baseConfig,
  external,
  output: {
    file: "dist/dato-image.esm.js",
    format: "esm",
    exports: "named",
  },
  plugins: [
    vue(basePluginConfig.vue),
    babel(basePluginConfig.babel),
    commonjs(),
  ],
};

const umdConfig = {
  ...baseConfig,
  external,
  output: {
    compact: true,
    file: "dist/dato-image.ssr.js",
    format: "cjs",
    name: "DatoImage",
    exports: "named",
    globals,
  },
  plugins: [
    vue({
      ...basePluginConfig.vue,
      template: {
        ...basePluginConfig.vue.template,
        optimizeSSR: true,
      },
    }),
    babel(basePluginConfig.babel),
    commonjs(),
  ],
};

const iifeConfig = {
  ...baseConfig,
  external,
  output: {
    compact: true,
    file: "dist/dato-image.min.js",
    format: "iife",
    name: "DatoImage",
    exports: "named",
    globals,
  },
  plugins: [
    vue(basePluginConfig.vue),
    babel(basePluginConfig.babel),
    commonjs(),
    terser({
      output: {
        ecma: 5,
      },
    }),
  ],
};

export default [esmConfig, umdConfig, iifeConfig];
