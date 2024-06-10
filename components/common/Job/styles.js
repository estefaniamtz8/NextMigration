const rejectAcceptBtnStyles = (color) => ({
    borderRadius: '2px',
    minWidth: '0',
    width: '60px',
    height: '30px',
    margin: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${color} !important`,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: `${color} !important`,
    },
  });
  
  export const logoStyles = {
    borderRadius: '0.5rem',
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    marginTop: '-60px',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'
  };
  
  export default rejectAcceptBtnStyles;
  