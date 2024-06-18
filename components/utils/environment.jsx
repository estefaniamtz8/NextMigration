import Server from './constants/server.json';
// dev-api.intrare.mx --- Dev
// api-general.intrare.mx --- Prod

export const Production = String(process.env.REACT_APP_IS_PRODUCTION) === 'true';
export const urlBase = String(process.env.REACT_APP_API_BASE);
// export const isLocalTest = true;
// export const urlBase =
//   // eslint-disable-next-line no-nested-ternary
//   isLocalTest && Production
//     ? 'http://localhost:8003'
//     : isLocalTest && !Production
//     ? 'http://localhost:8014'
//     : String(process.env.REACT_APP_API_BASE);
export const Version = Production ? Server['prod-version'] : Server['dev-version'];
export const userNameIndex = String(process.env.REACT_APP_USERS_INDEX);

export const endpointBaseAppSearch = String(process.env.REACT_APP_API_SEARCH_BASE);

export const searchKeyAppSearch = String(process.env.REACT_APP_API_SEARCH_KEY);

export const urlBaseCX = String(process.env.REACT_APP_CX_API_BASE);

export const urlPageCandidate = String(process.env.REACT_APP_CANDIDATES_APP);
