import { extendTheme, keyframes, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
const gra = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({
  config,
  fonts: {
    heading:  `var(--font-inter), sans-serif`,
    body: `var(--font-inter), sans-serif`,
  },
  components: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
    Button: {
      baseStyle: {
        color: 'white',
      },
      variants:{
        'action': {
          backgroundSize: '200% 100%',
          transition: 'transform 0.2s, background-position 0.2s',
          bgGradient:'linear(to-l, #fa5560, #b14bf4, #4d91ff)',
          _disabled: {
            bg: 'gray.400 !important',
            color: 'gray.600',
            cursor: 'not-allowed',
            opacity: 0.7,
            animation: 'none',
            transform: 'none !important',
          },
          _hover: {
            animation: `${gra} 5s infinite`,
            transform: 'translateY(-4px)'
          },

        }
      }
    },
  },
})
export default theme