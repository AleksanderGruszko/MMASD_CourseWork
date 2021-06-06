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
import {AppConfigurator} from './components/AppConfigurator';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AppConfigurator>
          <AppLayout
            renderMenu={MainMenu}
          >
            <PageRoutes />
          </AppLayout>
        </AppConfigurator>
      </ThemeProvider>
      <SnackbarProvider>
        <ConnectedNotifications />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
