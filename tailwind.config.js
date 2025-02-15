module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(80deg, #a777e1 0%, #1f17c1 100%)',
      },
      screens: {
        'md-lt': { max: '768px' },
        md: '769px',
        fhd: '1800px',
        '2000px': '2000px',
        '769-1100': { min: '769px', max: '1200px' },
        '769-1300': { min: '768px', max: '1400px' },
      },
      maxWidth: {
        '769-1300': '100%!imporant', 
      },
      fontFamily: {
        bigShoulders: ['Big Shoulders Display', 'sans-serif'],
      },
      colors: {
        primary: '#7D3CF3',
        secondary: '#D828FF',
        ll: {
          gray: '#C1C1C1',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      }
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
};
