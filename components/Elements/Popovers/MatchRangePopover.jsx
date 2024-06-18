import React from 'react'
import { Popover, Typography, Slider } from '@mui/material'

const MatchRangePopover = (args) => {
  const { dataPopoverMatches, onClosedMatchesFilterModal, rangeFilterMatches, setRangeFilterMatches } = args

  return (
    <Popover
      open={dataPopoverMatches?.open}
      anchorEl={dataPopoverMatches?.anchorEl}
      onClose={onClosedMatchesFilterModal}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{
        borderRadius: '10px',
        '& .MuiPopover-paper': {
          padding: '1vw 1vh',
          width: '15vw',
        },
      }}
    >
      <Typography
        className='text-base'
        sx={{
          marginBottom: '0.8vw',
        }}
      >
        Rango de matches: {rangeFilterMatches[0]} - {rangeFilterMatches[1]}
      </Typography>
      <Slider
        valueLabelDisplay='auto'
        min={0}
        max={100}
        value={rangeFilterMatches}
        onChange={(e, newValue) => {
          setRangeFilterMatches(newValue)
        }}
      />
    </Popover>
  )
}

export default MatchRangePopover
