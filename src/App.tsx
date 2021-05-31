import React from 'react';
import { Provider } from 'react-redux';
import {ThemeProvider} from '@material-ui/core/styles';
import AppLayout from './layouts/AppLayout';
import {MainMenu} from './components/MainMenu';
import {defaultTheme} from './themes/default.theme';
import {DataTable} from './components/DataTable/index';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AppLayout
          renderMenu={MainMenu}
        >
          <DataTable
            items={[
              {id: '1', name: 'Vasya', age: 32},
              {id: '2', name: 'Petya', age: 25},
            ]}
            uniqueFieldName="id"
            structure={[
              {title: 'user name', relatedFieldName: 'name'},
              {title: 'user age', relatedFieldName: 'age'},
            ]}
          />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
