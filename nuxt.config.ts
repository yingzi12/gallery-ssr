// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  dir: {
    static: 'static', // 新的静态文件夹名称
  },
  modules: [
    'nuxt-quasar-ui',
    'nuxt-simple-sitemap'
  ],
  runtimeConfig: {
    turso: {
      dbUrl: "https://vedio-db-yingzi12.turso.io/",
      dbAuthToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEwLTMwVDA5OjUyOjU5Ljg5OTI0Njk3NVoiLCJpZCI6IjZlOWUxMjkzLTc3MDctMTFlZS04Y2I5LTFlZWY0NDFjZTM4ZiJ9.8KtwHuvcFMcU4NBsNkwV4Wn05RDh4J-GDz4BMQyAU3WrXEnUZqe-9mz7Ceqkog3Ydj4puKfCAHhtan9j3A53BA",
    },
    // Public keys that are exposed to the client
    public: {
      baseUrl:  process.env.BASE_URL || 'https://admin.aiavr.uk'
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
  sitemap:{
    sources: [
      '/api/__sitemap__/urls',
    ]
  },
  serverMiddleware: [
    '~/middleware/cache.js'
  ]
})
