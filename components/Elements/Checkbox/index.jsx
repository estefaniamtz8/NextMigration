import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import {FontsData} from "../../../styles/palette";

/**
 * @description Checkbox component
 * @param {object} args - Object with props
 * @param {array} args.options - Array of options
 * @param {array} args.value - Array of values
 * @param {function} args.onChange - Function to call when the input changes
 * @param {string} args.name - Name of input
 * @returns {React.ReactNode}
 * */

function CheckBoxElement(args) {
  const { options = [], value = [], onChange = () => {}, name: nameElement = '' } = args;

  const handleChangeCheckbox = (event) => {
    const { checked, name } = event.target;
    const newValue = checked
      ? [...value, { label: name, value: name, checked }]
      : value.filter((item) => item.value !== name);
    onChange({
      target: {
        value: newValue,
        name: nameElement,
      },
    });
  };

  const renderOptions = React.useMemo(() => {
    const hasChecked = (name) => value.some((item) => item.value === name && item.checked);
    return options.map((option) => (
      <FormControlLabel
        key={uuid()}
        control={
          <Checkbox
            checked={hasChecked(option.value)}
            onChange={handleChangeCheckbox}
            name={option.value}
            size="large"
            sx={{
              color: 'primary.main',
            }}
          />
        }
        sx={{
          justifyContent: 'space-bet',
          alignItems: 'center',
          py: 1.5,
          '& .Mui-checked': {
            color: '#00080C !important',
          },
        }}
        label={
        <Typography
          variant="p"
          sx={
            {
              fontFamily: FontsData.reg,
              fontSize: "1.4em",
              fontWeight: "400"
            }
          }
        >
          {option.label}
        </Typography>}
      />
    ));
  }, [value, options]);

  return (
    <FormGroup
      sx={
        {
          display: "grid",
          gridTemplateColumns: 'repeat(2,1fr)',
        }
      }
    >
      {renderOptions}
    </FormGroup>
  );
}

export default CheckBoxElement;
