import PropTypes from 'prop-types';
import React from 'react';

import CreateView from './index.view';
import routeUrlProvider, { USER_LIST } from 'constants/route-paths';
import { create } from 'services/users';
import Layout from 'components/Layout';
import { currentLayoutState } from 'utils/layout';

const Create = ({ history }) => {
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
    <Layout label="User Create">
      <CreateView {...props} />
    </Layout>
  );
};

Create.propTypes = {
  history: PropTypes.object
};

export default Create;
