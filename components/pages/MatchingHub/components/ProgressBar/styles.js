const parentdiv = (height, width) => ({
    height,
    backgroundColor: '#FCCFCA',
    borderRadius: 40,
    width,
  });
  
  export const childdiv = (height, progress, bgcolor) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
  });
  
  export const progresstext = {
    color: 'white',
    fontFamily: 'Helvetica',
  };
  
  export default parentdiv;
  