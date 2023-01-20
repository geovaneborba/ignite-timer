import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Button />
        <Button variant="secondary" />
        <Button variant="danger" />
        <Button variant="success" />
      </div>

      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
