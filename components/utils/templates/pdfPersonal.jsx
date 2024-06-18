import React from 'react';
import PropTypes from 'prop-types';
import { BiDownload } from 'react-icons/bi';
import { savePDF } from '@progress/kendo-react-pdf';

const rating = ['Básico', 'Medio', 'Avanzado', 'Experto', 'Nativo'];
const CVPersonal = function (props) {
  const { className, height, infoGeneral } = props;
  const pdfExportComponent = React.useRef(null);

  const { lastNames, names, dataToAdmin = {}, codePhone, phone, email, address = {} } = infoGeneral;

  const { languages = [], skills = [], experienceFunctions = [], experienceIndustrias = [] } = dataToAdmin;
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 0,
        fileName: `CV Personal ${new Date().getFullYear()}`,
      });
    }
  };
  function getNamesAndLastNames() {
    if (names && lastNames) {
      return `${names} ${lastNames}`;
    }
    if (names) {
      return names;
    }
    if (lastNames) {
      return lastNames;
    }
    return 'Sin nombre asignado';
  }

  const cv = React.useMemo(
    () => (
      <main
        style={{
          height: '100%',
          position: 'relative',
        }}
      >
        <main
          className={`relative grid h-full w-full grid-cols-[35%_65%] gap-[10px] ${className}`}
          style={{ height }}
          ref={pdfExportComponent}
        >
          <section className="pl-4em flex w-[calc(100%-2em)] flex-col flex-wrap gap-[10px] bg-light-four pt-6 text-white">
            <h2 className="w-[calc(100%-2em)] text-base tracking-wider"> SOBRE MI </h2>
            {/* <h3> aki la descripcion </h3> */}

            <hr className="w-[calc(100%)]" />
            <h2 className="w-[calc(100%-2em)] text-base tracking-wider"> Habilidades </h2>
            <ul className="flex flex-col gap-[5px]">
              {skills?.map((skill) => (
                <li className="list-none text-base tracking-wider no-underline"> {skill?.label}</li>
              ))}
            </ul>
            <hr className="w-[calc(100%)]" />
            <h2 className="w-[calc(100%-2em)] text-base tracking-wider"> Contacto </h2>
            <article id="sectionContact">
              <span>
                +{codePhone} {phone}
              </span>
              <span
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {email}
              </span>
              <span>{address?.address}</span>
            </article>
          </section>

          <section id="rightSection">
            <h1 className="w-[calc(100%)]"> {getNamesAndLastNames()} </h1>
            <hr className="w-[calc(100%)]" />
            <h2 className="w-[calc(100%-2em)] text-base tracking-wider"> EXPERIENCIA </h2>
            <article id="sectionExperience">
              {experienceFunctions?.map((experience) => (
                <div>
                  <h3 className="text-[1.4em] font-semibold tracking-wider"> {experience?.label} </h3>
                  <span className="text-[1.3em] font-semibold tracking-wider">
                    {experience?.year ? `${experience?.year} años` : ''} {experience?.month} meses{' '}
                  </span>

                  <span>{experience?.details}</span>
                </div>
              ))}
              {experienceIndustrias?.map((experience) => (
                <div>
                  <header className="flex items-center justify-between gap-[10px] pr-[20px]">
                    <h3 className="text-[1.4em] font-semibold tracking-wider"> {experience?.label} </h3>
                    <span className="text-[1.3em] font-semibold tracking-wider">
                      {+experience?.year ? `${experience?.year} años` : ''} {experience?.month} meses{' '}
                    </span>
                  </header>
                  <span>{experience?.details}</span>
                </div>
              ))}
            </article>
            <hr className="w-[calc(100%)]" />
            <h2 className="w-[calc(100%-2em)] text-base tracking-wider"> IDIOMAS </h2>
            <article id="sectionLanguages">
              {languages?.map((language) => (
                <div className="flex flex-col gap-[10px] px-0 py-[10px]">
                  <h3 className="text-[1.4em] font-semibold tracking-wider"> {language?.label}: </h3>
                  <span className="text-[1.3em] font-semibold tracking-wider">
                    {rating[language?.rating - 1] || 'Intermedio'}{' '}
                  </span>
                </div>
              ))}
            </article>
          </section>
        </main>
        <section className="absolute bottom-[10px] right-[10px] flex flex-col gap-[10px] p-[10px]">
          <button
            className="bottom-[10px] right-[10px] flex cursor-pointer items-center justify-center rounded-full border-none bg-black p-[15px] text-white"
            type="button"
            onClick={exportPDFWithComponent}
          >
            <BiDownload size={16} />
          </button>
        </section>
      </main>
    ),
    [infoGeneral]
  );
  return cv;
};

CVPersonal.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  infoGeneral: PropTypes.objectOf(PropTypes.any),
  changeExportPDFLinkedIn: PropTypes.func,
};

CVPersonal.defaultProps = {
  className: '',
  height: '',
  infoGeneral: {},
  exportPDF: false,
  liteView: false,
  changeExportPDFLinkedIn: () => {},
};

export default CVPersonal;
