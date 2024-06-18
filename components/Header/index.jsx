import React from 'react';
import { Button, Popover, Stack, Typography, useTheme } from '@mui/material';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { RxExit } from 'react-icons/rx';
import { PiFlowArrow } from 'react-icons/pi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from 'assets/intrareLogotipo.png';
import { useSelector } from 'react-redux';
import { BsPeople, BsBarChartLine, BsBuilding } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import ModalSession from '../Navbar/modalSession';
import palette from '../../styles/palette';
import { Version } from '../../utils/environment';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });
  const theme = useTheme();

  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
      data: null,
    });
  };
  const isAdmin = useSelector((state) => state?.auth.user.claims.isAdmin);
  const userState = useSelector((state) => state?.admins?.me);
  return (
    <Stack
      bgcolor="nav.main"
      direction="row"
      justifyContent="space-between"
      sx={{
        boxShadow: '0px 3px 6px #00000029',
        height: '65px',
        zIndex: 2,
      }}
    >
      <ModalSession open={modal} onClose={() => setModal(false)} />
      <Popover
        id={dataPopover?.data?.docID}
        open={dataPopover?.open}
        anchorEl={dataPopover?.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            padding: '10px',
          }}
        >
          <Button
            disabled={isAdmin === false}
            style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}
            onClick={() => navigate('/admin')}
            variant="text"
          >
            <MdAdminPanelSettings style={{ width: '1.5rem', height: '1.5rem' }} /> Admin
          </Button>
          <Button style={{ justifyContent: 'flex-start' }} onClick={() => setModal(true)} variant="text">
            <RxExit size={20} /> Cerrar sesión
          </Button>
        </div>
      </Popover>

      <Stack className="pl-4" direction="row" alignItems="center" spacing={2}>
        <Stack p={2}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Image} alt="Logo" style={{ height: '25px' }} />
            <p
              style={{
                textDecoration: 'none',
                color: palette.black,
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
              }}
            >
              {Version}
            </p>
          </Link>
        </Stack>
        <Stack p={2} pl={3}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                textDecoration: 'none',
                color: pathname === '/' ? palette.purple300 : 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                ...theme?.typography?.subtitle3,
              }}
            >
              <AiOutlineHome size={18} />
              Home
            </Typography>
          </Link>
        </Stack>
        <Stack p={2}>
          <Link to="/people" style={{ textDecoration: 'none' }}>
            <Typography
              variant="light"
              sx={{
                textDecoration: 'none',
                color: pathname === '/people' ? palette.purple300 : 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                ...theme?.typography?.subtitle3,
              }}
            >
              <BsPeople size={18} />
              PeopleHub
            </Typography>
          </Link>
        </Stack>
        <Stack p={2}>
          <Link to="/analytics" style={{ textDecoration: 'none' }}>
            <Typography
              variant="light"
              sx={{
                textDecoration: 'none',
                color: pathname.includes('/analytics') ? palette.purple300 : 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                ...theme?.typography?.subtitle3,
              }}
            >
              <BsBarChartLine size={18} />
              Datalytics
            </Typography>
          </Link>
        </Stack>
        <Stack p={2}>
          <Link to="/companies" style={{ textDecoration: 'none' }}>
            <Typography
              variant="light"
              sx={{
                textDecoration: 'none',
                color: pathname === '/companies' ? palette.purple300 : 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                ...theme?.typography?.subtitle3,
              }}
            >
              <BsBuilding size={18} />
              CompanyHub
            </Typography>
          </Link>
        </Stack>
        <Stack p={2}>
          <Link to="/matchinghub" style={{ textDecoration: 'none' }}>
            <Typography
              variant="light"
              sx={{
                textDecoration: 'none',
                color: pathname.includes('/matchinghub') ? palette.purple300 : 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                ...theme?.typography?.subtitle3,
              }}
            >
              <PiFlowArrow size={22} />
              MatchingHub
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <Stack>
        <Stack p={2}>
          <div
            className="flex h-[calc(60px_32px)] min-w-[180px] cursor-pointer flex-wrap items-center gap-[10px] "
            onClick={(event) => {
              setDataPopover({
                anchorEl: event.currentTarget,
                open: true,
              });
            }}
          >
            <AiOutlineUser size={20} className="icon" />
            <Typography
              variant="light"
              sx={{
                textDecoration: 'none',
                color: 'text.main',
                fontFamily: theme?.typography?.fontFamily,
                letterSpacing: theme?.typography?.h2?.letterSpacing,
                ...theme?.typography?.subtitle3,
              }}
              className="mr-[10px]"
            >
              {userState?.names || 'Intrare'}
            </Typography>
            <IoIosArrowDown size={20} className="icon" />
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Header;
