import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import AppLayout from './layouts/AppLayout';
import {defaultTheme} from './themes/default.theme';

console.log(defaultTheme);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout
        renderMenu={() => (<div>AMO MENU</div>)}
      >
        AMO CONTENT
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
