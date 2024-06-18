import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';
import palette from 'styles/palette';

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: palette.purple300,
  },
});

export default AntTabs