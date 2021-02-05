import { get } from 'lodash';

export const currentLayoutState = location => {
  return {
    menuSelected: get(location.state, 'menuSelected', ''),
    typeTheme: get(location.state, 'typeTheme', 'light'),
    open: get(location.state, 'open', true)
  };
};
