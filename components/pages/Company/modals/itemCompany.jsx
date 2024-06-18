import React from 'react';
import { PropTypes } from 'prop-types';
import dayjs from 'dayjs';
import DefaultImage from 'assets/intrareLogotipo.png';
import { Divider } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';
import toast from 'react-hot-toast';

function isJsonString(str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return str;
  }
}

function ItemCompany(args) {
  const {
    onClick = () => {},
    companyName,
    logo,
    createdAt = 0,
    countVacanciesActive = 0,
    companyID,
    matchesAcceptedByUsers,
    matchesPending,
    matchesRefusedByUsers,
    matchesToAccept,
  } = args;

  const parsedLogo = isJsonString(logo);

  return (
    <div className="relative grid h-[30vh] w-full grid-rows-[48%_2%_48%] rounded-lg bg-white">
      <header className="flex h-auto gap-4 px-6 py-2 ">
        <img
          className="h-20 w-20 rounded-lg 2xl:h-24 2xl:w-24"
          src={typeof parsedLogo === 'string' ? logo : parsedLogo?.url || DefaultImage}
          alt="Logo"
        />
        <article className="flex w-full flex-col pt-3">
          <h1 className="pb-3 text-base font-medium text-black 2xl:text-lg"> {companyName || 'Sin titulo'} </h1>
          {/* <h2 className="text-sm font-medium text-black"> {location || 'Sin ubicación'} </h2> */}
          {/* <h2 className="text-sm font-medium text-black"> Sin Data </h2> */}
          <p
            onClick={() => {
              navigator.clipboard.writeText(companyID);
              toast.success('Copiado al portapapeles');
            }}
            className="cursor-pointer"
          >
            ID: {companyID}
          </p>
        </article>
        <article className="flex w-48 flex-col pt-3">
          <span className="flex cursor-pointer items-center justify-between text-sm text-purple" onClick={onClick}>
            Ver mas <BsArrowRight size={18} />
          </span>
          <span className="pt-2 text-[10px] text-black">
            Registrado {dayjs(createdAt).locale('es').format('DD/MMM/YYYY')}
          </span>
        </article>
      </header>
      <Divider />
      <main className="grid grid-cols-5 items-center">
        <article className="flex h-full flex-col items-center justify-center border-b-0 border-l-0 border-r-[1px] border-t-0 border-solid border-[#0000001f]">
          <h2 className="text-xl font-medium text-black 2xl:text-2xl"> {countVacanciesActive} </h2>
          <h3 className="pt-4 text-xs font-medium text-black 2xl:text-sm"> Vacantes Activas </h3>
        </article>
        <article className="flex h-full flex-col items-center justify-center border-b-0 border-l-0 border-r-[1px] border-t-0 border-solid border-[#0000001f]">
          <h2 className="text-xl font-medium text-black 2xl:text-2xl"> {matchesToAccept?.length || 0} </h2>
          <h3 className="pt-4 text-xs font-medium text-black 2xl:text-sm"> Matches Recibidos </h3>
        </article>

        <article className="flex h-full flex-col items-center justify-center border-b-0 border-l-0 border-r-[1px] border-t-0 border-solid border-[#0000001f]">
          <h2 className="text-xl font-medium text-black 2xl:text-2xl"> {matchesPending?.length || 0} </h2>
          <h3 className="pt-4 text-xs font-medium text-black 2xl:text-sm"> Matches Pendientes </h3>
        </article>

        <article className="flex h-full flex-col items-center justify-center border-b-0 border-l-0 border-r-[1px] border-t-0 border-solid border-[#0000001f]">
          <h2 className="text-xl font-medium text-black 2xl:text-2xl">
            {matchesAcceptedByUsers?.length || 0}/{matchesRefusedByUsers?.length || 0}
          </h2>
          <h3 className="pt-4 text-xs font-medium text-black 2xl:text-sm"> Ratio Acep / Rechaz </h3>
        </article>

        <article className="flex h-full flex-col items-center justify-center">
          <img className="h-8 w-8 2xl:h-12 2xl:w-12" src={DefaultImage} alt="Logo" id="logoImg" />
          <h3 className="pt-4 text-xs font-medium text-black 2xl:text-sm"> Connection </h3>
        </article>
      </main>
    </div>
  );
}

// const MainContainer = styled.main`
//   background-color: ${palette.white};
//   width: 95%;
//   min-width: 30vw;
//   height: 35vh;
//   border-radius: 10px;
//   padding-top: 15px;
//
//   header {
//     display: flex;
//     flex-direction: row;
//     padding-left: 15px;
//     padding-right: 15px;
//     align-items: center;
//     gap: 10px;
//     height: 10vh;
//
//     #infoAddress {
//       display: flex;
//       flex-direction: column;
//       gap: 8px;
//       width: calc(90% - 100px);
//       h1 {
//         font-family: ${FontsData.circularStd};
//         font-size: 18px;
//         font-weight: 300;
//       }
//       h2 {
//         font-size: 12px;
//         font-family: ${FontsData.circularStd};
//         font-weight: lighter;
//       }
//     }
//
//     #logoImg {
//       width: 50px;
//       height: 50px;
//       border-radius: 10px;
//       object-fit: contain;
//       object-position: center;
//       padding: 5px;
//     }
//
//     #containerMoreData {
//       width: 30%;
//       height: 100%;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: center;
//       #moreData {
//         display: flex;
//         flex-direction: row;
//         gap: 15px;
//         color: ${palette.purple300};
//         width: 100%;
//         font-family: ${FontsData.circularStd};
//         font-weight: lighter;
//         font-size: 14px;
//         justify-content: end;
//         cursor: pointer;
//         .icon {
//           width: 20px;
//         }
//       }
//       #registerLabel {
//         font-family: ${FontsData.circularStd};
//         letter-spacing: 0.5px;
//         font-size: 10px;
//       }
//     }
//   }
//
//   #containerInfoGeneral {
//     margin-top: 20px;
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     height: 20vh;
//     .hiddenBorderRight {
//       border-right: none !important;
//     }
//     .containerDataExtra {
//       width: 100%;
//       height: 100%;
//       display: flex;
//       flex-direction: column;
//       gap: 5px;
//       justify-content: center;
//       align-items: center;
//       //padding-top: 20px;
//       //padding-bottom: 20px;
//       border-top: solid 1px ${palette.color300};
//       border-right: solid 1px ${palette.color300};
//       .numberDataExtra {
//         font-family: ${FontsData.circularStd};
//         font-size: 24px;
//         font-weight: 500;
//       }
//       .textDataExtra {
//         font-family: ${FontsData.circularStd};
//         font-size: 12px;
//         font-weight: lighter;
//       }
//     }
//   }
// `;

ItemCompany.protoTypes = {
  companyName: PropTypes.string.isRequired,
};

ItemCompany.defaultProps = {
  companyName: '',
};
export default ItemCompany;
