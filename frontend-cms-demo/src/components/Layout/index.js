import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LayoutView from './index.view';
import routeUrlProvider from 'constants/route-paths';
import theme from 'styles/theme';
import { currentLayoutState } from 'utils/layout';

const Layout = ({ history, location, ...rest }) => {
  const [open, setOpen] = useState(get(location.state, 'open', true));
  const [typeTheme, setTypeTheme] = useState(
    get(location.state, 'typeTheme', 'light')
  );

  const muiTheme = type => {
    return createMuiTheme({
      palette: {
        type,
        primary: {
          main: theme.color.cyan[700]
        }
      },
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: theme.color.appBar[type]
          }
        }
      }
    });
  };

  const menuLink = path => {
    history.push({
      pathname: routeUrlProvider.getForLink(path),
      state: { menuSelected: path, typeTheme, open }
    });
  };

  const changePalette = () => {
    const theme = typeTheme === 'light' ? 'dark' : 'light';
    setTypeTheme(theme);
    history.replace(location.pathname, {
      ...currentLayoutState(location),
      typeTheme: theme
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    history.replace(location.pathname, {
      ...currentLayoutState(location),
      open: true
    });
  };

  const handleDrawerClose = () => {
    setOpen(false);
    history.replace(location.pathname, {
      ...currentLayoutState(location),
      open: false
    });
  };

  const props = {
    menuLink,
    theme,
    menuSelected: get(location.state, 'menuSelected', 'DASHBOARD'),
    typeTheme,
    changePalette,
    handleDrawerOpen,
    handleDrawerClose,
    open
  };

  const { palette, overrides } = muiTheme(typeTheme);

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette,
        overrides
      }}
    >
      <CssBaseline />
      <LayoutView {...rest} {...props} />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(Layout);
