import CodeCountry from 'utils/constants/codeCountries.json';

const countryToFlag = (isoCode) =>
  typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;

function getCodeCountries() {
  return CodeCountry.slice();
}

export {getCodeCountries, countryToFlag};
