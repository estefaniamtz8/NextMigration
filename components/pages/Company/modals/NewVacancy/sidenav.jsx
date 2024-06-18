import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'

import palette from 'styles/palette'

import steps from './constants'

const Item = ({ label, active, slug, icon, formToValidate }) => {
  const isActive = active === slug

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Stack
        component="button"
        type="submit"
        form={formToValidate}
        sx={{
          padding: '0.6rem',
          borderRadius: '8px',
          backgroundColor: `${isActive ? palette.purple300 : '#FFF'} !important`,
          color: isActive ? '#FFF' : palette.blackText,
          cursor: isActive ? 'default' : 'pointer',
          ...(!isActive ? { border: `1px solid ${palette.colorLightFive}` } : {})
        }}
      >
        {icon}
      </Stack>
      <Typography component="p" sx={{ color: isActive ? palette.purple300 : palette.blackText, fontSize: '0.8rem' }}>
        {label}
      </Typography>
    </Stack>
  )
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  formToValidate: PropTypes.string.isRequired,
}

function Sidenav({ active, formToValidate }) {
  return (
    <Stack
      alignItems="start"
      direction={{ xs: 'row', sm: 'column' }}
      sx={{ padding: '1rem 0', position: 'absolute', left: '2rem' }}
    >
      {steps.map((step, i) => (
        <React.Fragment key={step.key}>
          <Item
            active={active}
            label={step.label}
            slug={step.key}
            icon={step.icon}
            formToValidate={formToValidate}
          />
          {steps.length !== (i + 1) && (
            <Box sx={{ width: '1px', height: '35px', marginLeft: '22.5px', background: palette.colorLightFive }} />
          )}
        </React.Fragment>
      ))}
    </Stack>
  )
}

Sidenav.defaultProps = {
  active: 'vacancy'
}

Sidenav.propTypes = {
  active: PropTypes.oneOf(['vacancy', 'extras', 'documents']),
  formToValidate: PropTypes.string.isRequired,
}

export default Sidenav
