import PropTypes from 'prop-types';
import React from 'react';

import ViewComponent from './index.view';
import routeUrlProvider, { USER_LIST } from 'constants/route-paths';
import { currentLayoutState } from 'utils/layout';
import { create } from 'services/users';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { withTheme } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

const Component = ({ theme, history }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const onSubmit = values => {
    create(values).then(() =>
      history.push({
        pathname: routeUrlProvider.getForLink(USER_LIST),
        state: {
          ...currentLayoutState(history.location),
          menuSelected: USER_LIST
        }
      })
    );
  };

  const props = {
    onSubmit
  };

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette: { ...theme.mui.palette, primary: muiTheme.palette.primary }
      }}
    >
      <CssBaseline />
      <ViewComponent {...props} />
    </ThemeProvider>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Component);
