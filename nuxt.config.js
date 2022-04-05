export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: process.env.npm_package_name || '',

        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' },

        ]
    },


  loading: { color: '#10B981', height: '4px' },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [

      { src: '@/plugins/bus.js', ssr: false },


   // {src:'@/plugins/quill.js',ssr: false},
],


    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
     //    https:go.nuxtjs.dev/tailwindcss,
        '@nuxtjs/tailwindcss',

    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',

       'vue-sweetalert2/nuxt',
    "vue-toastification/nuxt",



    ],

 sweetalert: {
    confirmButtonColor: '#059862',
    cancelButtonColor: '#ff7674'
  },
  toast: {
    timeout: 1000,
    closeOnClick: false
  },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:8000/',
        credentials: true
    },


    auth: {
        strategies: {
            'laravelSanctum': {
                provider: 'laravel/sanctum',
                url: 'http://localhost:8000',
                endpoints: {
                    login: {
                        url: '/login'
                    },
                    logout: {
                        url: '/logout'
                    },
                    user: {
                        url: '/api/user'
                    },
                },
                user: {
                    property: false
                }
            },
        },
        redirect: {
            login: '/auth/login',
            logout: '/auth/login',
            home: '/',
        }
    },

      build: {


}



}
