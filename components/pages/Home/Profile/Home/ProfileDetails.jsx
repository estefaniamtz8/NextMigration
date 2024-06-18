import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import { BsEyeFill, BsFillEyeSlashFill, BsWhatsapp } from 'react-icons/bs';
import { AiFillFacebook, AiOutlineEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import { MdCalendarMonth, MdClose } from 'react-icons/md';
import { ResumeSkeleton } from 'components/Elements/Skeleton';
import TagsComponent from 'components/Elements/Tags';
import toast from 'react-hot-toast';
import CommonChip from '../CommonChip';
import Sidebar from './Sidebar';
// import Mapa from './Mapa';
import TabsComponent from './TabsComponent';
import EditProfile from './HomeTab/EditProfile';
import { setUserLocalRedux } from '../../../../../redux/actions/users_actions';
import palette from '../../../../../styles/palette';
import { countryToFlag, getCodeCountries } from '../../../../../utils/functions/getCodeContries';
import Timeline from '../../../../Elements/Timeline';

const MapaLazy = React.lazy(() => import('./Mapa'));

const ProfileDetails = (args) => {
  const { setShowDetails, person, tabValue, data, showDetails, tabs, setTab } = args;
  const [showMap, setShowMap] = useState(false);
  const [chargePostulant, setChargePostulant] = React.useState(false);
  const [isLoadingUser, setIsLoadingUser] = React.useState(true);

  const dispatch = useDispatch();

  const onLoadDataGeneralUser = () => {
    setChargePostulant(false);
    if (person?.userID) {
      setIsLoadingUser(() => true);
      fetchDataPostAsync('aperture/user/personal', {
        IdUser: person?.userID,
      })
        .then((data) => {
          const dataNew = data?.user;
          dispatch(setUserLocalRedux(dataNew));
          setIsLoadingUser(() => false);
        })
        .catch(() => {
          setIsLoadingUser(() => false);
        });
    }
  };

  React.useEffect(() => {
    onLoadDataGeneralUser();
  }, [person?.userID, chargePostulant]);

  if (isLoadingUser) {
    return <ResumeSkeleton />;
  }

  return (
    <>
      <figure className="flex">
        <div>
          <figure className="h-[120px] w-[120px] rounded-full bg-gray ">
            <img
              className="h-full w-full rounded-full object-cover"
              alt="Foto de perfil"
              src="https://source.unsplash.com/random/300×300/?texturas-3d"
            />
          </figure>
          <div className="relative top-[-1rem] flex justify-center">
            <CommonChip
              color={palette.red300}
              title={
                data?.isComplete || data?.isFromPrototype
                  ? 'Perfil al 90%'
                  : `No terminó paso ${data?.lastStepRegister || 'desconocido'}`
              }
            />
          </div>
        </div>
        <div className="mx-[0.25rem] my-0 flex flex-col gap-1 px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xl">
              {countryToFlag(
                getCodeCountries()?.find((codFlag) => codFlag?.phoneCode === parseInt(person?.codePhone, 10))?.iso2 ||
                  'MX'
              )}
            </p>
            <h1
              onClick={() => {
                navigator.clipboard.writeText(`${person?.names} ${data?.lastNames}`);
                toast.success('Copiado al portapapeles');
              }}
              className="cursor-pointer text-xl font-light"
            >
              {person?.names} {data?.lastNames}
            </h1>
            {showDetails ? (
              <MdClose
                size={24}
                cursor="pointer"
                className="text-gray200"
                onClick={() => setShowDetails(false)}
                color="#E0E0E0"
              />
            ) : (
              <AiOutlineEdit
                size={24}
                cursor="pointer"
                className="text-gray200"
                onClick={() => setShowDetails(true)}
                color="#E0E0E0"
              />
            )}
          </div>
          <div className="flex items-stretch gap-4">
            <MdCalendarMonth color="#E0E0E0" size={18} />
            <p className="font-founders text-sm">
              {dayjs(data?.dataToAdmin?.birth).locale('es').format('DD/MMM/YYYY')}
            </p>
            <p className="font-founders text-sm">{data?.dataToAdmin?.gender?.label}</p>
            <p
              onClick={() => {
                navigator.clipboard.writeText(person?.userID);
                toast.success('Copiado al portapapeles');
              }}
              className="cursor-pointer font-founders text-sm"
            >
              ID: {person?.userID}
            </p>
          </div>
          <div className="flex w-3/4 items-stretch gap-4">
            {showMap && (
              <BsFillEyeSlashFill size={24} color="#E0E0E0" onClick={() => setShowMap(false)} cursor="pointer" />
            )}
            {!showMap && (
              <BsEyeFill
                color="#E0E0E0"
                size={24}
                onClick={() => {
                  if (person?.address) {
                    setShowMap(true);
                  }
                }}
                cursor={person?.address ? 'pointer' : 'disabled'}
              />
            )}
            <p
              onClick={() => {
                navigator.clipboard.writeText(person?.address);
                toast.success('Copiado al portapapeles');
              }}
              className="cursor-pointer font-founders text-sm"
            >
              {person?.address || `No terminó paso ${data?.lastStepRegister || 'desconocido'}`}
            </p>
          </div>
          {data?.registerWhitFacebook && person?.phone === '0' ? (
            <div className="flex items-stretch gap-4">
              <AiFillFacebook fontSize="medium" style={{ width: '20px', color: '#E0E0E0' }} />
              <p className="font-founders text-sm text-black no-underline">Registado con Facebook</p>
            </div>
          ) : (
            <div className="flex items-stretch gap-4">
              <BsWhatsapp fontSize="medium" style={{ width: '20px', color: '#E0E0E0' }} />
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${
                  !data?.phone?.toString()?.includes('+') ? data?.whatsApp?.codePhone || data?.codePhone || 52 : ``
                }${person?.phone}`}
                className="font-founders text-sm text-black no-underline"
              >
                {!data?.phone?.toString()?.includes('+') ? data?.whatsApp?.codePhone || data?.codePhone || 52 : ``}{' '}
                {person?.phone}
              </a>
            </div>
          )}
          <TagsComponent person={person} data={data} />
          <Timeline person={person} />
        </div>
      </figure>

      <div>
        <TabsComponent data={data} tabs={tabs} value={tabValue} setValue={setTab} />
      </div>
      <EditProfile data={data} showDetails={showDetails} setShowDetails={setShowDetails} tabValue={tabValue} />

      <Sidebar size="31.5%" open={showMap}>
        <MapaLazy setShowMap={setShowMap} address={data?.address} />
      </Sidebar>
    </>
  );
};

export default ProfileDetails;
