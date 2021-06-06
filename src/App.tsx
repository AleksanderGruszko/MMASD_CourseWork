import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import AppLayout from './layouts/AppLayout';
import { MainMenu } from './components/MainMenu';
import {defaultTheme} from './themes/default.theme';
import store from './store';
import { ConnectedNotifications } from './components/atoms/ConnectedNotifications';
import PageRoutes from './pages';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AppLayout
          renderMenu={MainMenu}
        >
          <PageRoutes />
        </AppLayout>
      </ThemeProvider>
      <SnackbarProvider>
        <ConnectedNotifications />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
