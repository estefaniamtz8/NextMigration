import palette from "styles/palette"

export const phoneInpuStyles = {
  input: {
    backgroundColor: palette.bgMain,
    borderRadius: '8px',
    border: 'none',
    boxShadow: 'none',
    color: palette.blackText,
    height: '38px',
    padding: '0.8rem',
    fontSize: '0.8rem',
  },
  select: {
    backgroundColor: palette.bgMain,
    borderRadius: '8px',
    border: 'none',
    boxShadow: 'none',
    color: palette.blackText,
    height: '38px',
    padding: '0.8rem',
    fontSize: '0.8rem',
    '& input': {
      padding: '0 10px !important',
      width: '100%',
      backgroundColor: palette.bgMain,
      fontSize: '0.8rem',
      color: palette.blackText,
    },
    '& .MuiInputBase-formControl': {
      padding: '0 !important',
      width: '100%',
    },
  }
}

export default phoneInpuStyles
