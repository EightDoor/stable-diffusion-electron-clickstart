import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "node:path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {pluginExposeRenderer} from "./vite.base.config.mjs";

const pathSrc = path.resolve(__dirname, 'src/renderer')
// https://vitejs.dev/config
export default defineConfig((env) => {
    /** @type {import('vite').ConfigEnv<'renderer'>} */
    const forgeEnv = env;
    const {root, mode, forgeConfigSelf} = forgeEnv;
    const name = forgeConfigSelf.name ?? '';

    /** @type {import('vite').UserConfig} */
    return {
        root,
        mode,
        base: './',
        build: {
            outDir: `.vite/renderer/${name}`,
        },
        plugins: [
            pluginExposeRenderer(name),
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
                dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
            }),
            Components({
                resolvers: [
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    ElementPlusResolver()
                ],
                dts: path.resolve(pathSrc, 'components.d.ts'),
            }),
            Icons({
                autoInstall: true,
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src/renderer"),
                "@base": path.resolve(__dirname, "."),
            },
            preserveSymlinks: true,
        },
        clearScreen: false,
    };
});
