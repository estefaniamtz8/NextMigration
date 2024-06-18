import React from 'react'
import { Popover, Stack, FormLabel, Slider } from '@mui/material'
import SORT_OPTIONS from 'components/pages/MatchingHub/components/Filters/constants'
import palette from 'styles/palette'
import { SelectWithLabel } from "../InputWithLabel";

const MatchFiltersPopover = args => {
  const { showFilters, setShowFilters, onChangeFilter, filters } = args
  return (
    <Popover
      id='filters'
      open={showFilters?.open}
      anchorEl={showFilters?.anchorEl}
      onClose={() => setShowFilters({ ...showFilters, open: false })}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Stack spacing={1} direction='column' sx={{ padding: '0.8rem' }}>
        <SelectWithLabel
          htmlFor='sort'
          label='Ordernar por'
          placeholder='Ordenar por'
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={e => onChangeFilter(e)}
          aria-placeholder='Ordenar por'
          variant='outlined'
          color='secondary'
          size='small'
        />
        <FormLabel htmlFor='matchFit'>Match Fit</FormLabel>
        <Slider
          size='small'
          name='matchFit'
          defaultValue={60}
          onChangeCommitted={(e, val) => onChangeFilter(e, 'matchFit', val)}
          aria-label='matchFit'
          valueLabelDisplay='auto'
          min={0}
          max={100}
          sx={{ color: palette.purple300 }}
        />
      </Stack>
    </Popover>
  )
}

export default MatchFiltersPopover
