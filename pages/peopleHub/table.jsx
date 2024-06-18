import React from 'react';
import { countryToFlag, getCodeCountries } from 'utils/functions/getCodeContries';
import { cutText } from 'utils/functions/general';
import ProgressBarTricolor from 'components/pages/Home/progressBarTricolor';
import ViableCbx from 'components/pages/Home/viableCbx';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs';

const Table = (args) => {
  const {
    selectAll,
    setSelectAll,
    filter,
    setSelectedUsers,
    selectedUsers,
    dataTable,
    dataPopoverMatches,
    setOpenModalCandidate,
    onClosedMatchesFilterModal,
    setDataPopoverDocumentsFilters,
    dataPopoverDocumentsFilters,
    setDataPopoverDocuments,
    setIdCandidate,
    setDataPopover,
    handleChangeViability,
    setDataPopoverMatches,
  } = args;
  return (
    <table className="h-[calc(50%_150px)] w-full overflow-auto rounded-lg">
      <thead className="h-[60px] rounded-t-lg bg-light-four text-black">
        <tr className="grid h-[60px] grid-cols-[calc(20%-20px)_12%_calc(20%-10px)_calc(15%-7px)_15%_15%_4%]">
          <td className="flex flex-col justify-center pl-7 text-start font-sans text-[14px]">
            <div className="flex items-center gap-x-2 pl-1">
              <input
                onChange={() => {
                  if (selectAll?.some((page) => page === filter?.page)) {
                    setSelectAll(selectAll?.filter((page) => page !== filter?.page));
                    setSelectedUsers(selectedUsers?.filter((user) => user.page !== filter?.page));
                  } else {
                    setSelectAll([...selectAll, filter?.page]);
                    setSelectedUsers([
                      ...selectedUsers?.filter((user) => user?.page !== filter?.page),
                      ...dataTable?.map((user) => ({
                        ...user,
                        page: filter?.page,
                      })),
                    ]);
                  }
                }}
                checked={selectAll?.some((page) => page === filter?.page)}
                type="checkbox"
                className="form-checkbox cursor-pointer rounded border-[1px] border-solid border-gray200 text-purple ring-0 ring-transparent"
              />
              <p> Nombre</p>
            </div>
          </td>
          <td className="flex flex-col justify-center text-center font-sans text-[14px]">Comunidad</td>
          <td className="flex flex-col justify-center text-center font-sans text-[14px]"> WhatsApp / Facebook </td>
          <td className="flex justify-center self-center text-center font-sans text-[14px]" id="filterMatches">
            # de Matches
            {dataPopoverMatches?.open ? (
              <MdFilterAltOff onClick={onClosedMatchesFilterModal} className='inline cursor-pointer' size={16} />
            ) : (
              <MdFilterAlt
                size={16}
                className="inline cursor-pointer"
                onClick={() => {
                  setDataPopoverMatches({
                    anchorEl: document?.querySelector('#filterMatches'),
                    open: true,
                  });
                }}
              />
            )}
          </td>
          <td id="filterDocuments" className="flex justify-center self-center text-center font-sans text-[14px]">
            Documentos
            {dataPopoverDocumentsFilters?.open ? (
              <MdFilterAltOff
                onClick={() => {
                  setDataPopoverDocumentsFilters({
                    anchorEl: document?.querySelector('#filterDocuments'),
                    open: false,
                  });
                }}
                className="inline cursor-pointer"
                size={16}
              />
            ) : (
              <MdFilterAlt
                onClick={() => {
                  setDataPopoverDocumentsFilters({
                    anchorEl: document?.querySelector('#filterDocuments'),
                    open: true,
                  });
                }}
                className="inline cursor-pointer"
                size={16}
              />
            )}
          </td>
          <td className="flex flex-col justify-center text-center font-sans text-[14px]"> Viabilidad </td>
          <td className="flex flex-col justify-center text-center font-sans text-[14px]"> Acciones </td>
        </tr>
      </thead>
      <tbody className="h-[10vh] max-h-[calc(100vh-80px)] w-full overflow-auto bg-white">
        {dataTable?.map((user, idx) => (
          <tr
            className="grid h-[60px] grid-cols-[calc(20%-20px)_12%_calc(20%-10px)_calc(15%-7px)_15%_15%_4%] items-center border-x-0 border-b-[1px] border-t-0 border-solid border-gray200 pl-7 tracking-wider"
            key={user?.userID}
          >
            <td className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-left">
              <div className="flex items-center gap-x-2 pl-1">
                <input
                  checked={selectedUsers?.some((userSelected) => userSelected?.userID === user?.userID)}
                  type="checkbox"
                  onChange={() => {
                    if (selectedUsers?.some((userSelected) => userSelected?.userID === user?.userID)) {
                      setSelectedUsers((prevState) =>
                        prevState?.filter((userSelected) => userSelected?.userID !== user?.userID)
                      );
                    } else {
                      setSelectedUsers([...selectedUsers, { ...user, page: filter?.page }]);
                    }
                  }}
                  className="form-checkbox cursor-pointer rounded border-[1px] border-solid border-gray200 text-purple ring-0 ring-transparent"
                />
                <span
                  onClick={() =>
                    setOpenModalCandidate({
                      ...user,
                      // userID: value?.docID,
                      idx: idx + 1,
                    })
                  }
                  id="labelTitle"
                  className="text-[14px]"
                >
                  {user?.lastNames || user?.names
                    ? `${user?.names ? user?.names : ''} ${user?.lastNames ? cutText(user?.lastNames) : ''} (${
                        user?.alias || 'Sin alias'
                      })`
                    : 'Sin nombre asignado'}
                </span>
              </div>
            </td>
            <td className="w-full text-center text-[14px] tracking-wider">
              {cutText(user?.belongingToCommunity.join(', '), 15) || 'Sin comunidad'}
            </td>
            <td className="w-full text-center text-[14px] tracking-wider">
              {user?.phone === '0'
                ? 'Facebook'
                : `${countryToFlag(
                    getCodeCountries()?.find((codFlag) => codFlag?.phoneCode === parseInt(user?.codePhone, 10))?.iso2 ||
                      'MX'
                  )} ${!user?.phone?.toString()?.includes('+') ? `+${user?.codePhone || 52}` : ``} ${user?.phone}`}
            </td>
            <td className="w-full text-center text-[14px] tracking-wider">{user?.numberOfMatches || 0} Matches</td>
            <td
              onClick={(event) => {
                setDataPopoverDocuments({
                  anchorEl: event.currentTarget,
                  open: true,
                  data: user,
                });
                setIdCandidate(user?.userID);
              }}
              className="flex w-full justify-center text-center text-[14px] tracking-wider"
            >
              <ProgressBarTricolor
                widthRed={`${user?.percentageNoDocuments}%`}
                widthGreen={`${user?.percentageYesDocuments}%`}
                widthGray={`${100 - (+user?.percentageNoDocuments + +user?.percentageYesDocuments)}%`}
              />
            </td>
            <td className="flex w-full justify-center text-center text-[14px] tracking-wider">
              <ViableCbx userID={user?.userID} state={user?.viability || 'no'} funct={handleChangeViability} />
            </td>
            <td
              className="flex w-full justify-center text-center text-[14px] tracking-wider"
              onClick={(event) => {
                setDataPopover({
                  anchorEl: event.currentTarget,
                  open: true,
                  data: user,
                });
              }}
            >
              <BsThreeDotsVertical size={16} className="cursor-pointer text-blackIcon" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
