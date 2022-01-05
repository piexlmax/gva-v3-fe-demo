import { defineConfig,UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs"
import dotenv from 'dotenv'
const {resolve} = require('path')

// https://vitejs.dev/config/
export default defineConfig(({mode}:UserConfig):UserConfig=>{
   // 根据环境变量加载环境变量文件
  const GVA_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`))
  const reg = new RegExp("^"+GVA_ENV.VITE_BASE_API)
  return{
    base: './',
    resolve:{
      alias: {
        '@': resolve(__dirname, './src'),
      }
  },
  server: {
    port:Number(GVA_ENV.VITE_BASE_CLI_PORT),
    proxy: {
      [GVA_ENV.VITE_BASE_API]: {
        target: `${GVA_ENV.VITE_BASE_PATH}:${GVA_ENV.VITE_BASE_SERVER_PORT}`,
        changeOrigin: true,
        rewrite: path => path.replace(reg, '')
      },
    }
  },
  plugins: [
    vue()
  ]
  }
})
