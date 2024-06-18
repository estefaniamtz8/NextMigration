import React from 'react'
import { Popover, Typography, Stack, FormControl, FormControlLabel, Switch } from '@mui/material'

const DocumentsFilterPopover = (args) => {
  const { dataPopoverDocumentsFilters, setDataPopoverDocumentsFilters, filter, setFilter } = args

  return (
    <Popover
      id='documentsFilter'
      open={dataPopoverDocumentsFilters?.open}
      anchorEl={dataPopoverDocumentsFilters?.anchorEl}
      onClose={() => {
        setDataPopoverDocumentsFilters({
          ...dataPopoverDocumentsFilters,
          open: false,
        })
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiPopover-paper': {
          padding: '12px 12px',
        },
      }}
    >
      <Stack direction='column'>
        <Stack>
          <Typography className='text-base'>Filtro avanzados</Typography>
          <FormControl>
            <FormControlLabel
              id='rfc'
              name='rfc'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  rfc: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.rfc}
              control={<Switch color='checkbox' />}
              label='No tiene RFC'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='nss'
              name='nss'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  nss: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.nss}
              control={<Switch color='checkbox' />}
              label='No tiene NSS'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='curp'
              name='curp'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  curp: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.curp}
              control={<Switch color='checkbox' />}
              label='No tiene CURP'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='hasDocuments'
              name='hasDocuments'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  hasDocuments: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.hasDocuments}
              control={<Switch color='checkbox' />}
              label='No tiene Documento Migratorio'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='acta'
              name='acta'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  acta: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.acta}
              control={<Switch color='checkbox' />}
              label='No tiene Acta de nacimiento'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='gradeCertification'
              name='gradeCertification'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  gradeCertification: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.gradeCertification}
              control={<Switch color='checkbox' />}
              label='No tiene Certificado de educación'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='criminalRecord'
              name='criminalRecord'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  criminalRecord: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.criminalRecord}
              control={<Switch color='checkbox' />}
              label='No tiene Antecedentes penales'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='passport'
              name='passport'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  passport: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.passport}
              control={<Switch color='checkbox' />}
              label='No tiene Pasaporte válido'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='licence'
              name='licence'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  licence: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.licence}
              control={<Switch color='checkbox' />}
              label='No tiene Licencia de conducir'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              id='cv'
              name='cv'
              onChange={e => {
                setFilter(prev => ({
                  ...prev,
                  cv: e.target.checked || false,
                  page: 1,
                }))
              }}
              checked={filter?.cv}
              control={<Switch color='checkbox' />}
              label='No tiene CV'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                },
              }}
            />
          </FormControl>
        </Stack>
      </Stack>
    </Popover>
  )
}

export default DocumentsFilterPopover
