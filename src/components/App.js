import React from 'react'
import styledNormalize from 'styled-normalize'
import { injectGlobal, ThemeProvider } from 'styled-components'

import Calendar from './Calendar'
import theme from '../style/theme'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Quicksand');
  ${styledNormalize};
  
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    font-family: 'Quicksand', sans-serif;
  }
`

const App = () => (
	<ThemeProvider theme={theme}>
		<Calendar />
	</ThemeProvider>
)

export default App
