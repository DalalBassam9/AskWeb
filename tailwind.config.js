
module.exports = {
  theme: {
    extend: {
    animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
         animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },

      divideWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
       '3': '3px',
        '4': '4px',
       '6': '6px',
       '8': '8px',
      },


      colors: {




        Emerald:{

          500:'#10b981',
          200:'#a7f3d0',
          100:'#d1fae5'
        },


        emerald: {
          200:'#a7f3d0'
        },




      },

      fontFamily: {
       'cursive': ['cursive'],
      },

  screens: {

       'xs': '520px',


      },

       width: {
         '1/7': '14.2857143%',
         '2/7': '28.5714286%',
         '3/7': '42.8571429%',
         '4/7': '57.1428571%',
         '5/7': '71.4285714%',
         '6/7': '85.7142857%',
      },





      },

  },

  variants: {},
  plugins: [

  require('@tailwindcss/forms'),

  ],
  purge: {

  },
   corePlugins: {
      // ...
     divideWidth: true,
    }


}
