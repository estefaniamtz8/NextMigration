import React from 'react';
import ModalBuilder from 'components/Elements/Modal';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { isExcludeRoute } from 'utils/functions/routes';

const Loader = function () {
  const location = useLocation();

  const [color, setColor] = React.useState('primary');

  const open = useSelector((state) => state.loader.loader);

  React.useEffect(() => {
    if (isExcludeRoute(location.pathname)) {
      setColor('secondary');
    } else {
      setColor('primary');
    }
  }, [location.pathname]);

  if (open) {
    return <ModalBuilder open isLoader color={color} />;
  }

  return null;
};

export default Loader;
