import { getDocMain } from '../../services/firebase';
import { Version } from '../environment';

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validEmail(email) {
  return regex.test(email);
}

// eslint-disable-next-line import/prefer-default-export
export const openLinkReactPDF = (e) => {
  /** el evento no ocurre dentro de la misma ventana */
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  /** si se produce un evento se abre una ventana nueva */
  if (e.target.tagName.toLowerCase() === 'a') {
    window.open(e.target.href, '_blank');
  }
};

export function adaptArrayToSelect(array) {
  return array?.map((item) => ({
    value: item,
    label: item,
  }));
}

export function cutText(dato = '', optionalLongitud) {
  const logitud = optionalLongitud || 8;
  let datoAMostrar = '';

  for (let i = 0; i < logitud; i++) datoAMostrar += dato[i];

  if (dato?.length > logitud) {
    // eslint-disable-next-line no-return-assign
    return (datoAMostrar += '...');
  }
  return dato;
}

export const forceRefresh = async () => {
  try {
    // console.log('aki');
    const remote = await getDocMain('API_data', 'version');
    // console.log(remote?.info?.intrareAdmin, Version);
    if (!remote) return;
    if (Version !== remote?.info?.intrareAdmin) window.location.reload(true);
  } catch (e) {
    window.location.reload(true);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { validEmail };
