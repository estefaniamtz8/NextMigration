import React from 'react';
import { LocationOn } from '@mui/icons-material';
import { MdDataSaverOff } from 'react-icons/md';
import Image from 'next/image'; 
import DefaultLogoIntrare from 'public/assets/intrareLogotipo.png'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../Sidebar';
import CommonButton from '../../CommonButton';

const WatchVacancySidebar = ({ showVacancy, setShowVacancy, match }) => {
  return (
    <Sidebar size="31.5%" open={showVacancy}>
      <div>
        <div className="h-[12rem] bg-[url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
          <div className="absolute left-8 top-5">
            <CommonButton width="10rem" onClick={() => setShowVacancy(false)} text="Cerrar" />
          </div>
          <figure className="relative left-8 top-32 h-28 w-28">
            <Image
              alt="Imagen de la empresa"
              className="h-full w-full rounded-lg"
              src={match?.company?.logo?.url || match?.company?.logo || DefaultLogoIntrare}
              layout="fill"
              objectFit="contain"
            />
          </figure>
        </div>
        <div className="flex flex-col gap-y-2 px-8 py-20">
          <h1 className="text-lg font-medium text-purple300">{match?.company?.companyName}</h1>
          <div>
            <div className="flex items-center gap-2">
              <MdDataSaverOff width="20px" color="pink" />
              <p className="text-xs text-purple300">
                {match?.salaryWork === 0 ? 'Sin especificar' : `$${match?.salaryWork}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LocationOn sx={{ color: 'pink', width: '20px' }} />
              <p className="text-xs text-purple300">{match?.['Zona de trabajo'] || '?'}</p>
            </div>
          </div>
          <div className="text-black">
            <h3>About the Role</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis hic inventore id! Delectus ab amet, quod
              rem in odit officia magnam blanditiis esse excepturi beatae cupiditate numquam accusantium aliquid. Hic?
            </p>
          </div>
          <div className="text-black">
            <h3>What you will do</h3>
            <ul>
              {match?.functions?.map((toDo) => (
                <li className="text-black" key={toDo?.value}>
                  {toDo?.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default WatchVacancySidebar;
