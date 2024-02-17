// vite.renderer.config.mjs
import { defineConfig } from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "node:path";
import AutoImport from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/unplugin-vue-components/dist/resolvers.js";
import Icons from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///F:/project/my-project/stable-diffusion-all/stable-diffusion-electron/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "F:\\project\\my-project\\stable-diffusion-all\\stable-diffusion-electron";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src/renderer");
var vite_renderer_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts")
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "components.d.ts")
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src/renderer"),
      "@base": path.resolve(__vite_injected_original_dirname, "./")
    }
  }
});
export {
  vite_renderer_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5yZW5kZXJlci5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxccHJvamVjdFxcXFxteS1wcm9qZWN0XFxcXHN0YWJsZS1kaWZmdXNpb24tYWxsXFxcXHN0YWJsZS1kaWZmdXNpb24tZWxlY3Ryb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHByb2plY3RcXFxcbXktcHJvamVjdFxcXFxzdGFibGUtZGlmZnVzaW9uLWFsbFxcXFxzdGFibGUtZGlmZnVzaW9uLWVsZWN0cm9uXFxcXHZpdGUucmVuZGVyZXIuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovcHJvamVjdC9teS1wcm9qZWN0L3N0YWJsZS1kaWZmdXNpb24tYWxsL3N0YWJsZS1kaWZmdXNpb24tZWxlY3Ryb24vdml0ZS5yZW5kZXJlci5jb25maWcubWpzXCI7Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZ1xyXG5cclxuaW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHtFbGVtZW50UGx1c1Jlc29sdmVyfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcblxyXG5jb25zdCBwYXRoU3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9yZW5kZXJlcicpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcclxuICAgICAgICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogJ0ljb24nLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdhdXRvLWltcG9ydHMuZC50cycpLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxyXG4gICAgICAgICAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ10sXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCAnY29tcG9uZW50cy5kLnRzJyksXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgSWNvbnMoe1xyXG4gICAgICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3JlbmRlcmVyXCIpLFxyXG4gICAgICAgICAgICBcIkBiYXNlXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9cIiksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVEsb0JBQW1CO0FBQzNCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUSwyQkFBMEI7QUFFbEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBVjFCLElBQU0sbUNBQW1DO0FBWXpDLElBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUV0RCxJQUFPLCtCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDUCxvQkFBb0I7QUFBQSxRQUNwQixjQUFjO0FBQUEsVUFDVixRQUFRO0FBQUEsUUFDWixDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxtQkFBbUI7QUFBQSxJQUNsRCxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxXQUFXO0FBQUE7QUFBQSxRQUVQLGNBQWM7QUFBQSxVQUNWLG9CQUFvQixDQUFDLElBQUk7QUFBQSxRQUM3QixDQUFDO0FBQUEsUUFDRCxvQkFBb0I7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxpQkFBaUI7QUFBQSxJQUNoRCxDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDRixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUMzQyxTQUFTLEtBQUssUUFBUSxrQ0FBVyxJQUFJO0FBQUEsSUFDekM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
