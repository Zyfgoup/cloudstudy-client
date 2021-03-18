module.exports = {
  /*
  ** Headers of the page
  */
  head: {
      title: '云上学 - 随时随地在线学习',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'keywords', name: 'keywords', content: '云上学-在线学习网站,IT在线视频教程,Java视频,HTML5视频,前端视频,Python视频,大数据视频' },
        { hid: 'description', name: 'description', content: '云上学-在线学习站是国内新兴的IT在线视频学习平台、职业教育平台。云上学会同上百个知名开发团队联合制定的Java、HTML5前端、大数据、Python等视频课程，欢迎使用进行学习' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
  ],

  css: [
    'swiper/dist/css/swiper.css'
  ]
}
