import { Next } from 'next'; 
import React, { useEffect, useState, Suspense } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Pagination, Popover } from '@mui/material';
import { setAdminData, setAdmins, setFiltersAdminRedux } from 'redux/actions/admins_actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { urlBase } from '../../../utils/environment';
import Container from '../../../components/Container';
import { loader } from '../../../redux/actions/loader_actions';

const WatchPermissionsLazy = React.lazy(() => import('./Modal/WatchPermissions'));
const DeleteUserLazy = React.lazy(() => import('./Modal/DeleteUser'));

const AdminHome = ({ initialAdmins }) => {
  const [openModalCandidate, setOpenModalCandidate] = useState(false);
  const {
    admins: { admins: adminsRedux },
  } = useSelector((state) => state);
  const {
    user: { uid },
  } = useSelector((state) => state.auth);

  const [firstTen, setFirstTen] = useState([]);
  const [initialData, setInitialData] = useState(initialAdmins);
  const [filter, setFilter] = useState({
    textSearch: '',
    page: 1,
    numPages: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loader(true));
    const fetchData = async () => {
      try {
        const url = '/administrator/administrators';
        const getData = await axios.request({
          url,
          method: 'GET',
          baseURL: urlBase,
        });
        const administrators = getData?.data?.body?.administrators;
        dispatch(setAdmins(administrators));
        const meData = administrators.find((item) => item.docID === uid);
        dispatch(setAdminData(meData));
        setInitialData(administrators);
        dispatch(loader(false));
      } catch (err) {
        dispatch(loader(false));
        console.error(err);
      }
    };
    if (adminsRedux.length === 0) {
      fetchData().then(() => {});
    } else {
      dispatch(loader(false));
      const meData = adminsRedux.find((item) => item.docID === uid);
      dispatch(setAdminData(meData));
      setInitialData(adminsRedux);
    }
  }, [adminsRedux]);

  useEffect(() => {
    let dataToFilter = initialData;

    if (Array.isArray(initialData)) {
      dataToFilter = initialData;
    } else if (typeof initialData === 'object') {
      dataToFilter = Object.values(initialData).flat();
    }

    const filteredData = dataToFilter.filter((item) =>
      String(item?.names).toLowerCase().includes(filter.textSearch.toLowerCase())
    );

    const numberOfPages = Math.ceil(filteredData.length / filter.pageSize);
    setFilter((prevFilter) => ({
      ...prevFilter,
      numPages: numberOfPages,
    }));

    const groups = [];
    for (let i = 0; i < filteredData.length; i += filter.pageSize) {
      groups.push(filteredData.slice(i, i + filter.pageSize));
    }

    dispatch(setFiltersAdminRedux({ page: filter.page, numPages: numberOfPages, allData: groups }));

    setFirstTen(groups[filter.page - 1]);
  }, [filter.page, filter.textSearch, initialData]);

  function onChangeInputFilter({ target }) {
    const { value } = target;
    setFilter((prev) => ({
      ...prev,
      textSearch: value,
    }));
  }

  const [admin, setAdmin] = useState({});
  const [openModalDeleteCandidate, setOpenModalDeleteCandidate] = React.useState(false);
  const allowDelete = useSelector((state) => state?.admins?.me?.tablePermissions?.superUser);
  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });
  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
      data: null,
    });
  };
  const onClickDeleteCandidate = (data) => {
    setAdmin(data);
    setOpenModalDeleteCandidate(true);
  };

  const onCloseModalDeleteCandidate = () => {
    setOpenModalDeleteCandidate(false);
  };

  return (
    <Container>
      <main className="relative grid h-[calc(100vh-60px)] grid-cols-[20%_80%] items-center justify-center bg-cream p-0">
        <Suspense fallback={<div>Loading...</div>}>
          <DeleteUserLazy
            open={openModalDeleteCandidate}
            onClose={onCloseModalDeleteCandidate}
            handleClose={handleClose}
            setDataTable={setInitialData}
            userID={admin?.docID}
          />
          <WatchPermissionsLazy setOpenModalCandidate={setOpenModalCandidate} openModalCandidate={openModalCandidate} />
        </Suspense>
        <article className="absolute z-20 m-auto h-[calc(95vh-60px)] w-[90vw] self-center justify-self-center p-[10px]">
          <header>
            <div className="relative flex w-full flex-wrap items-center justify-between gap-[20px] pb-[20px]">
              <input
                className="w-[27%] rounded-lg border-none bg-white px-4 py-3 font-sans font-medium outline-none placeholder:text-black"
                onChange={onChangeInputFilter}
                id="textSearch"
                name="textSearch"
                type="text"
                value={filter.textSearch}
                placeholder="Buscar por palabra clave"
                autoComplete="off"
              />
              <button
                className="w-max cursor-pointer rounded-lg border-none bg-purple px-8 py-3 text-white"
                type="button"
                onClick={() => setOpenModalCandidate(true)}
              >
                Agregar usuarios
              </button>
            </div>
          </header>

          <article className="h-[calc(90%-50px)] w-full overflow-auto rounded-2xl">
            <Popover
              id={dataPopover?.data?.docID}
              open={dataPopover?.open}
              anchorEl={dataPopover?.anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <main style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', padding: '10px 0' }}>
                <Button
                  style={{ color: 'red', width: '100%' }}
                  disabled={!allowDelete}
                  onClick={() => onClickDeleteCandidate(dataPopover?.data)}
                >
                  Borrar usuario
                </Button>
              </main>
            </Popover>
            <table className="h-fit max-h-max w-full overflow-auto">
              <thead className="h-[60px] items-center justify-center rounded-t-lg bg-light-four text-black">
                <tr className="grid h-full grid-cols-[calc(32%-20px)_calc(20%-10px)_calc(15%-5px)_15%_15%_5%]">
                  <td className="flex flex-col justify-center pl-7 text-start font-sans text-[14px]"> Usuario </td>
                  <td className="flex flex-col justify-center text-center font-sans text-[14px]"> WhatsApp </td>
                  <td className="flex flex-col justify-center text-center font-sans text-[14px]">Correo</td>
                  <td className="flex flex-col justify-center text-center font-sans text-[14px]">Último ingreso</td>
                  <td className="flex flex-col justify-center text-center font-sans text-[14px]">Permiso</td>
                  <td className="flex flex-col justify-center text-center font-sans text-[14px]"> Acciones </td>
                </tr>
              </thead>
              <tbody className="h-[10vh] max-h-[calc(100vh-80px)] w-full overflow-auto bg-white">
                {firstTen?.map((user, idx) => (
                  <tr
                    className="grid h-[60px] grid-cols-[calc(32%-20px)_calc(20%-10px)_calc(15%-5px)_15%_15%_8%] items-center border-x-0 border-b-[1px] border-t-0 border-solid border-gray200 pl-7 tracking-wider"
                    key={idx}
                  >
                    <td className="flex w-[calc(100%-50px)] flex-wrap items-center gap-[10px] text-[14px] tracking-wider">
                      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start">{user?.names}</span>
                    </td>
                    <td className="w-full text-center text-[14px] tracking-wider">
                      {user?.phone?.code} {user?.phone?.number}
                    </td>
                    <td className="w-full text-center text-[14px] tracking-wider">{user?.email}</td>
                    <td className="w-full text-center text-[14px] tracking-wider">
                      {user?.updateTime || dayjs(user?.createAt).locale('es').format('DD/MMM/YYYY')}
                    </td>
                    <td className="w-full text-center text-[14px] tracking-wider">{user?.permissions}</td>
                    <td className="w-full text-center text-[14px] tracking-wider">
                      <BsThreeDotsVertical
                        onClick={(event) => {
                          setDataPopover({
                            anchorEl: event.currentTarget,
                            open: true,
                            data: user,
                          });
                        }}
                        className="w-[20px] cursor-pointer text-blackIcon"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <Pagination
            shape="rounded"
            color="pagination"
            count={filter.numPages}
            onChange={(e, page) =>
              setFilter((prev) => ({
                ...prev,
                page,
              }))
            }
            sx={{
              color: '#000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: '#cccccc',
              },
              '.MuiPaginationItem-page.Mui-selected': {
                color: '#FFF',
              },
              '.MuiPaginationItem-page': {
                color: '#000',
              },
              '.MuiPaginationItem-icon': {
                color: '#000',
              },
              '.MuiPaginationItem-ellipsis': {
                color: '#000',
              },
            }}
          />
        </article>
      </main>
    </Container>
  );
};

// Función para obtener datos del servidor en cada solicitud
export async function getServerSideProps() {
  try {
    const url = '/administrator/administrators';
    const response = await axios.get(urlBase + url);
    const administrators = response.data.body.administrators;

    return {
      props: {
        initialAdmins: administrators,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialAdmins: [],
      },
    };
  }
}

export default AdminHome;
