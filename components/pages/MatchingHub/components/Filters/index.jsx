import React from 'react';
import PropTypes from 'prop-types';
import { BsFilter } from 'react-icons/bs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import isEmpty from 'lodash/isEmpty';

const MatchFiltersPopoverLazy = React.lazy(() => import('components/Elements/Popovers/MatchFiltersPopover'));

const Filters = ({ filters, companies, jobs, onChangeFilters, onReset }) => {
  const [showFilters, setShowFilters] = React.useState({
    anchorEl: null,
    open: false,
  });

  const companiesForSelect = React.useMemo(() => companies?.map((company) => company.companyName), [companies]);

  const jobsForSelect = React.useMemo(() => jobs?.map((job) => ({ value: job.jobID, label: job.jobTitle })), [jobs]);

  const onChangeFilter = (e, key, val) => {
    const name = key || e.target.name;
    const value = val || e.target.value;

    if (name === 'job') {
      const foundJob = !value ? {} : jobs.find((job) => job.jobID === value.value);
      return onChangeFilters(name, value, foundJob);
    }

    return onChangeFilters(name, value);
  };

  const onBeforeReset = () => {
    onReset();
    setShowFilters(null);
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Más filtros" placement="top" arrow>
          <BsFilter
            aria-describedby="filters"
            size={22}
            style={{ cursor: 'pointer', width: '50px' }}
            onClick={(e) => setShowFilters({ anchorEl: e.currentTarget, open: true })}
          />
        </Tooltip>
        <Autocomplete
          htmlFor="companies"
          options={companiesForSelect}
          value={filters?.companies}
          onChange={(_, value) => onChangeFilter({ target: { value, name: 'companies' } })}
          renderInput={(params) => (
            <TextField {...params} placeholder="Empresa" aria-placeholder="Empresa" size="small" />
          )}
          size="small"
          sx={{ width: '40%', background: '#FFF', borderRadius: '8px' }}
          multiple
        />
        <Autocomplete
          htmlFor="job"
          options={jobsForSelect}
          value={filters?.jobs}
          isOptionEqualToValue={(option, value) => option.label === value.label || value === ''}
          getOptionLabel={(option) => option.label}
          onChange={(_, value) => onChangeFilter({ target: { value, name: 'job' } })}
          renderInput={(params) => (
            <TextField {...params} placeholder="Vacante" aria-placeholder="Vacante" size="small" />
          )}
          size="small"
          sx={{ width: '40%', background: '#FFF', borderRadius: '8px' }}
          disabled={isEmpty(filters.companies)}
        />
        <Button variant="contained" color="primary" size="small" onClick={onBeforeReset} sx={{ height: '35px' }}>
          Limpiar
        </Button>
      </Stack>
      <MatchFiltersPopoverLazy
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onChangeFilter={onChangeFilter}
        filters={filters}
      />
    </>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape().isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChangeFilters: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Filters;
