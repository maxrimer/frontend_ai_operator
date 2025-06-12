// vite.config.ts
import mdx from "file:///Users/aslankalpe/Desktop/bereke/stand/node_modules/.pnpm/@mdx-js+rollup@3.1.0_acorn@8.14.1_rollup@4.42.0/node_modules/@mdx-js/rollup/index.js";
import federation from "file:///Users/aslankalpe/Desktop/bereke/stand/node_modules/.pnpm/@originjs+vite-plugin-federation@1.4.1/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import react from "file:///Users/aslankalpe/Desktop/bereke/stand/node_modules/.pnpm/@vitejs+plugin-react@4.5.1_vite@5.4.19_@types+node@20.19.0_lightningcss@1.30.1_terser@5.41.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/aslankalpe/Desktop/bereke/stand/node_modules/.pnpm/vitest@1.6.1_@types+node@20.19.0_jsdom@24.1.3_lightningcss@1.30.1_terser@5.41.0/node_modules/vitest/dist/config.js";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      mdx({
        providerImportSource: "@mdx-js/react"
      }),
      federation({
        name: "app",
        remotes: {
          remoteApp: mode === "development" ? "http://localhost:5001/assets/remoteEntry.js" : "https://verdant-jelly-22f11b.netlify.app/assets/remoteEntry.js"
        },
        shared: {
          react: {},
          "react-dom": {},
          wouter: {
            version: "3.3.5"
          }
        }
      })
    ],
    optimizeDeps: {
      // https://github.com/vitejs/vite/issues/3910
      exclude: ["@ozen-ui/fonts"],
      include: ["react/jsx-runtime"]
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true
        }
      }
    },
    build: {
      cssMinify: "lightningcss",
      sourcemap: false,
      target: "esnext"
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXNsYW5rYWxwZS9EZXNrdG9wL2JlcmVrZS9zdGFuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FzbGFua2FscGUvRGVza3RvcC9iZXJla2Uvc3RhbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FzbGFua2FscGUvRGVza3RvcC9iZXJla2Uvc3RhbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJztcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVucmVzb2x2ZWRcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIG1keCh7XG4gICAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiAnQG1keC1qcy9yZWFjdCcsXG4gICAgICB9KSxcbiAgICAgIGZlZGVyYXRpb24oe1xuICAgICAgICBuYW1lOiAnYXBwJyxcbiAgICAgICAgcmVtb3Rlczoge1xuICAgICAgICAgIHJlbW90ZUFwcDpcbiAgICAgICAgICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCdcbiAgICAgICAgICAgICAgPyAnaHR0cDovL2xvY2FsaG9zdDo1MDAxL2Fzc2V0cy9yZW1vdGVFbnRyeS5qcydcbiAgICAgICAgICAgICAgOiAnaHR0cHM6Ly92ZXJkYW50LWplbGx5LTIyZjExYi5uZXRsaWZ5LmFwcC9hc3NldHMvcmVtb3RlRW50cnkuanMnLFxuICAgICAgICB9LFxuICAgICAgICBzaGFyZWQ6IHtcbiAgICAgICAgICByZWFjdDoge30sXG4gICAgICAgICAgJ3JlYWN0LWRvbSc6IHt9LFxuICAgICAgICAgIHdvdXRlcjoge1xuICAgICAgICAgICAgdmVyc2lvbjogJzMuMy41JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvMzkxMFxuICAgICAgZXhjbHVkZTogWydAb3plbi11aS9mb250cyddLFxuICAgICAgaW5jbHVkZTogWydyZWFjdC9qc3gtcnVudGltZSddLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICB0cmFuc2Zvcm1lcjogJ2xpZ2h0bmluZ2NzcycsXG4gICAgICBsaWdodG5pbmdjc3M6IHtcbiAgICAgICAgZHJhZnRzOiB7XG4gICAgICAgICAgY3VzdG9tTWVkaWE6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIGNzc01pbmlmeTogJ2xpZ2h0bmluZ2NzcycsXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIHNldHVwRmlsZXM6ICcuL3NldHVwVGVzdHMudHMnLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsT0FBTyxTQUFTO0FBQ3BULE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUVsQixTQUFTLG9CQUFvQjtBQUc3QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsUUFDRixzQkFBc0I7QUFBQSxNQUN4QixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxXQUNFLFNBQVMsZ0JBQ0wsZ0RBQ0E7QUFBQSxRQUNSO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixPQUFPLENBQUM7QUFBQSxVQUNSLGFBQWEsQ0FBQztBQUFBLFVBQ2QsUUFBUTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsY0FBYztBQUFBO0FBQUEsTUFFWixTQUFTLENBQUMsZ0JBQWdCO0FBQUEsTUFDMUIsU0FBUyxDQUFDLG1CQUFtQjtBQUFBLElBQy9CO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsUUFDWixRQUFRO0FBQUEsVUFDTixhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
