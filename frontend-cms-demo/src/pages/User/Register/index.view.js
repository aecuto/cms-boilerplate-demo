import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiPaper from '@material-ui/core/Paper';

import UserForm from '../components/Form';

const Paper = styled(MuiPaper)`
  && {
    padding: 20px;
    margin-top: 10%;
  }
`;

const ViewComponent = ({ onSubmit }) => {
  return (
    <Container>
      <Paper>
        <Typography variant="h3" gutterBottom align="center">
          Create User
        </Typography>
        <UserForm onSubmit={onSubmit} />
      </Paper>
    </Container>
  );
};

ViewComponent.propTypes = {
  onSubmit: PropTypes.func
};

export default ViewComponent;
