import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ThemeProvider } from 'styled-components'
import { Router } from './Components/Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router/>
    </ThemeProvider>
  )
}
