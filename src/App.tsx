import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import AppLayout from './layouts/AppLayout';
import {MainMenu} from './components/MainMenu';
import {defaultTheme} from './themes/default.theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout
        renderMenu={MainMenu}
      >
        AMO CONTENT
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
