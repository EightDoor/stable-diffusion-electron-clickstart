// https://vitejs.dev/config

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "node:path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const pathSrc = path.resolve(__dirname, 'src/renderer')

export default defineConfig({
    plugins: [
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
        }
    }
});
