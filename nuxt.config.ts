// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        title:'LandingPad',
        script:[
            {
                src:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
                integrity:'sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4',
                crossorigin:'anonymous',
            }
        ]    
    },        
  },
  runtimeConfig:{
      public:{
          API_URL:'https://localhost:8000',
      }        
  },
  components: [
      {
          path: '~/components',
          pathPrefix: false,
      },
  ],
  css: [
      '@/assets/scss/main.scss',
  ],      
})
