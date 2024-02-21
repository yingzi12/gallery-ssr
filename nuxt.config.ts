// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  dir: {
    static: 'static', // 新的静态文件夹名称
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    'nuxt-quasar-ui'
  ],
  site: {
    url: 'https://www.aiavr.uk',
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      // baseUrl:  process.env.BASE_URL || 'https://admin.aiavr.uk'
      baseUrl:"https://admin.aiavr.uk"
      // baseUrl:"http://192.168.68.100:8098"
    }
  },
  quasar: { /* */ },
  meta: {
    title: '图集网-图片,美女,写真,图集',
    meta: [
          { name: 'content-language', content: 'zh-CH' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'keywords', name: 'keywords', content: "图片,美女,写真,图集" },
      { hid: 'description', name: 'keywords', content: "图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' } // 指向你的 favicon
    ],
  },
  sitemap: {
    sources: ['/api/sitemap'],
  },
  serverMiddleware: [
    '~/middleware/cache.js'
  ]
})
