import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import palette from 'styles/palette';

const ApplicantsPagination = ({ candidates, current, onNext, onPrevious, onSelectCandidate }) => (
  <Box sx={{ position: 'relative', width: '100%' }}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        padding: '1.2rem',
        position: 'sticky',
        top: 0,
        background: '#FFF',
        height: '70px',
        borderRight: `1px solid ${palette.gray200}`,
      }}
    >
      <IoIosArrowBack
        size={22}
        color={palette.purple300}
        style={{
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          pointerEvents: current === 0 ? 'none' : 'auto',
          opacity: current === 0 ? '0.3' : '1',
        }}
        onClick={() => onPrevious(current - 1)}
      />
      <Typography component="p" color={palette.purple300}>
        {`${current + 1} de ${candidates.length}`}
      </Typography>
      <IoIosArrowForward
        size={22}
        color={palette.purple300}
        style={{
          cursor: current === candidates.length - 1 ? 'not-allowed' : 'pointer',
          pointerEvents: current === candidates.length - 1 ? 'none' : 'auto',
          opacity: current === candidates.length - 1 ? '0.3' : '1',
        }}
        onClick={() => onNext(current + 1)}
      />
    </Stack>

    <Box sx={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 70px)', borderRight: `1px solid ${palette.gray200}` }}>
      {candidates.map((candidate, index) => (
        <Stack
          key={`${candidate.candidateID} ${index + 1}`}
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{
            background: current === index ? palette.gray300 : '#FFF',
            padding: '2rem 1rem',
            borderTop: `1px solid ${palette.gray200}`,
            cursor: 'pointer',
          }}
          onClick={() => onSelectCandidate(index, candidate)}
        >
          <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', background: palette.green }} />
          <Typography component="p">{candidate.name}</Typography>
        </Stack>
      ))}
    </Box>
  </Box>
);

ApplicantsPagination.defaultProps = {
  current: 0,
};

ApplicantsPagination.propTypes = {
  current: PropTypes.number,
  candidates: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSelectCandidate: PropTypes.func.isRequired,
};

export default ApplicantsPagination;
