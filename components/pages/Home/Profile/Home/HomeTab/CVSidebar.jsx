import React, { useRef } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import { BiSolidDownload } from 'react-icons/bi';
import { BsPinAngleFill, BsWhatsapp } from 'react-icons/bs';
import { Divider } from '@mui/material';
import Sidebar from '../Sidebar';
import useOnClickOutside from '../../../../../../hook/useOnClickOutside';

const CVSidebar = ({ showCV, data = {}, setShowCV }) => {
  const pdfExportComponent = useRef(null);
  const CVSidebarRef = useRef();

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 0,
        fileName: `CV Personal ${new Date().getFullYear()}`,
      });
    }
  };

  useOnClickOutside(CVSidebarRef, () => setShowCV(false));

  const getLanguageLevel = (rating) => {
    switch (rating) {
      case 0:
      case 1:
      case 2:
        return 'Básico';
      case 3:
      case 4:
        return 'Intermedio';
      case 5:
        return 'Nativo';
      default:
        return 'Básico';
    }
  };

  return (
    <Sidebar size="auto" open={showCV}>
      <div className="h-full" ref={CVSidebarRef}>
        <div className="flex h-full w-[40rem] text-black" ref={pdfExportComponent}>
          <div className="flex flex-col justify-between w-2/6 bg-cream">
            <div className="flex flex-col gap-4 p-4 ml-4">
              <h2 className="text-sm font-medium 2xl:text-base">Contacto</h2>
              <div className="flex items-center gap-x-2">
                <BsWhatsapp size={20} />
                <p className="pt-1 text-sm font-helvetica">
                  {data?.codePhone} {data?.phone}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <BsPinAngleFill size={18} />
                <p className="w-4/5 pt-1 text-sm font-helvetica">{data?.address?.address}</p>
              </div>
              <h2 className="text-sm font-medium 2xl:text-base">Habilidades</h2>
              <ul className="list-none">
                {data?.dataToAdmin?.skills?.map((skill) => (
                  <li className="text-sm font-helvetica" key={skill?.label}>
                    {skill?.label}
                  </li>
                ))}
              </ul>
              <h2 className="text-sm font-medium 2xl:text-base">Idiomas Hablados</h2>
              <ul className="list-none">
                {data?.dataToAdmin?.languages?.map((language) => (
                  <li className="text-sm font-helvetica" key={language?.label}>
                    {language?.label} - {getLanguageLevel(language?.rating)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-4/5">
            <div className="ml-4 flex w-[87%] flex-col gap-4 px-4 py-6">
              <h1 className="text-2xl font-medium">
                {data.names} {data.lastNames}
              </h1>
              <div className="flex flex-col gap-2 pt-6">
                <div>
                  <h2 className="text-sm font-medium">Experiencia previa</h2>
                  <Divider className="py-1" />
                </div>
                {data?.dataToAdmin?.experienceIndustrias?.map((experience) => (
                  <div key={experience?.label}>
                    <div className="flex items-center justify-between">
                      <h3 className="w-2/3 text-base font-medium font-helvetica xl:w-3/4">{experience?.label}</h3>
                      <span className="self-start w-1/3 text-sm font-helvetica xl:w-1/4">
                        {experience?.year} {experience?.year === 1 ? 'año' : 'años'} {experience?.month}
                        {experience?.month <= 1 ? 'mes' : 'meses'}
                      </span>
                    </div>
                    <p className="text-xs font-helvetica">{experience?.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-6">
                <div>
                  <h2 className="text-sm font-medium">Educacion maxima</h2>
                  <Divider className="py-1" />
                </div>
                <div>
                  <h3 className="text-sm font-medium font-helvetica 2xl:text-base">{data?.grade?.label}</h3>
                  <p className="text-xs font-helvetica">{data?.grade?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={exportPDFWithComponent}
          className="absolute bottom-0 right-0 m-12 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-[black]"
          type="button"
        >
          <BiSolidDownload size={20} fontSize="large" />
        </button>
      </div>
    </Sidebar>
  );
};

export default CVSidebar;
