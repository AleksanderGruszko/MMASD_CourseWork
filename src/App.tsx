import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <AppLayout
            renderMenu={MainMenu}
          >
            <AppConfigurator>
              <PageRoutes />
            </AppConfigurator>
          </AppLayout>
        </ThemeProvider>
        <SnackbarProvider>
          <ConnectedNotifications />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
