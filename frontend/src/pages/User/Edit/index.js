import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import EditView from './index.view';

import { getById, update } from 'services/users';
import routeUrlProvider, { USER_LIST } from 'constants/route-paths';

import Layout from 'components/Layout';
import { currentLayoutState } from 'utils/layout';

const Edit = ({ history, match }) => {
  const [user, setUser] = useState({});
  const { userId } = match.params;

  useEffect(() => {
    if (userId) {
      getById(userId).then(data => setUser(data));
    }
  }, [userId]);

  const onSubmit = values => {
    const { name, email } = values;
    const data = {
      name,
      email
    };

    return update(userId, data).then(() =>
      history.push({
        pathname: routeUrlProvider.getForLink(USER_LIST),
        state: currentLayoutState(history.location)
      })
    );
  };

  const props = { user, onSubmit };

  return (
    <Layout label="User Edit">
      <EditView {...props} />
    </Layout>
  );
};

Edit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default Edit;
