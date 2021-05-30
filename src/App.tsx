import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import AppLayout from './layouts/AppLayout';
import {MainMenu} from './components/MainMenu';
import {defaultTheme} from './themes/default.theme';
import {DataTable} from './components/DataTable/index';

function App() {
  return (
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
  );
}

export default App;
