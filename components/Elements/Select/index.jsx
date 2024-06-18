import React from 'react'
import { Select, Box, Chip, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'

import palette from 'styles/palette'

const SimpleSelect = React.forwardRef(({ htmlFor, options, ...props }, ref) => (
  <Select
    id={htmlFor}
    name={htmlFor}
    ref={ref}
    labelId={htmlFor}
    sx={props.asChips ? { height: 'auto !important'} : {} }
    renderValue={(selected) => {
      if (selected.length === 0) {
        return props.placeholder
      }
      if (props.multiple && props.asChips) {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={options.find((opt) => opt.value === value)?.label || value}
                sx={{ backgroundColor: palette.red300, color: palette.blackText }}
              />
            ))}
          </Box>
        )
      }
      return props.multiple ?
        selected.map((value) => options.find((opt) => opt.value === value)?.label || value).join(', ')
        : options.find((opt) => opt.value === selected)?.label || selected;
    }}
    displayEmpty
    {...props}
  >
    <MenuItem disabled value="">
      {props.placeholder}
    </MenuItem>
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
    ))}
  </Select>
))

SimpleSelect.displayName = "SimpleSelect"
SimpleSelect.defaultProps = {
  htmlFor: "select",
  placeholder: "Selecciona una opción",
  multiple: false,
  asChips: false,
}
SimpleSelect.propTypes = {
  htmlFor: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  asChips: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default SimpleSelect
