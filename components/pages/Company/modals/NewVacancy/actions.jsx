import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Actions = ({ currentForm, label, onSave }) => (
  <>
    <Button
      variant="outlined"
      color="primary"
      sx={{ width: '12rem', height: '100%', marginRight: '0.5rem' }}
      onClick={onSave}
    >
      Guardar Borrador
    </Button>
    <Button
      variant="contained"
      color="primary"
      type="submit"
      form={currentForm}
      sx={{ width: '12rem', height: '100%' }}
    >
      {label}
    </Button>
  </>
);

Actions.defaultProps = {
  currentForm: null,
};

Actions.propTypes = {
  currentForm: PropTypes.string,
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Actions;
