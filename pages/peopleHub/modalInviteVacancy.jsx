import React, { useEffect, useState } from 'react';
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import ModalBuilder, { ActionsModal } from '../../components/Elements/Modal';
import { fetchDataGetAsync, fetchDataPostAsync } from '../../services/axios/fetchs';
import { setVacancyRedux } from '../../redux/actions/vacancy_actions';
import { FontsData } from '../../styles/palette';
import { Version } from '../../utils/environment';
import { addCustomEvent } from '../../services/notifications';
import { inviteUsersToVacancy } from '../../services/invitations';

const ModalInviteVacancy = (args) => {
  const { open, onClose, candidate, selectedUsers, setSelectedUsers } = args;
  // const [localVacancy, setLocalVacancy] = React.useState([]);
  const [arrayChecked, setArrayChecked] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userState = useSelector((state) => state?.admins?.me);
  useEffect(() => {
    setLoading(true);
    fetchDataGetAsync('/ats/vacancy/all')
      .then((data) => {
        dispatch(setVacancyRedux(data.body));
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error en la busqueda de vacantes');
        // NotificationManager.error('Error en la busqueda de vacantes', 'code: 500');
        setLoading(false);
      });
  }, []);
  const { vacancies } = useSelector((state) => state.vacancies);
  const onChange = (event) => {
    const { checked } = event.target;
    const { name } = event.target;

    if (checked) {
      const arrayCheckedCopy = [...arrayChecked];
      vacancies.forEach((item) => {
        if (item.docID === name) {
          arrayCheckedCopy.push(item.docID);
        }
      });
      setArrayChecked(arrayCheckedCopy);
    } else {
      setArrayChecked(arrayChecked.filter((item) => item !== name));
    }
  };

  const { mutate: mutateAddCustomEvent } = useMutation({
    mutationFn: addCustomEvent,
  });

  const onSubmit = async () => {
    const arrayVacancies = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of arrayChecked) {
      const dataVacancy = vacancies?.find((vacn) => vacn.docID === id);
      arrayVacancies.push(dataVacancy);
    }
    if (selectedUsers?.length > 0) {
      const sendable = {
        candidates: selectedUsers,
        vacancies: arrayVacancies,
        admin: userState,
        version: Version,
      };
      inviteUsersToVacancy(sendable)
        .then(() => {
          setArrayChecked([]);
          setSelectedUsers([]);
          onClose();
          toast.success('Invitaciones enviadas');
        })
        .catch(() => {
          toast.error('Error al enviar invitaciones');
          // NotificationManager.error('Error al enviar invitaciones', 'Error', 3000);
          setArrayChecked([]);
          // console.log(error);
        });
    } else {
      const sendable = {
        candidate,
        vacancies: arrayVacancies,
        admin: userState,
        version: Version,
      };
      fetchDataPostAsync('/ats/invite/vacancies', sendable)
        .then(() => {
          setArrayChecked([]);
          onClose();
          mutateAddCustomEvent({
            userID: candidate?.userID,
            templateID: 'invited-to-vacancy',
            name: 'Se invitó a una vacante',
            description: 'Se invitó a una vacante - Match forzado',
            type: 'whatsapp',
            metadata: {
              vacancies: arrayVacancies?.map((vacancy) => `${vacancy?.name} de ${vacancy?.companyName}`)?.toString(),
            },
          });
          toast.success('Invitación enviada');
          // NotificationManager.success('Invitación enviada', 'Éxito', 3000);
        })
        .catch(() => {
          toast.error('Error al enviar invitación');
          // NotificationManager.error('Error al enviar invitación', 'Error', 3000);
          setArrayChecked([]);
          // console.log(error);
        });
    }
  };

  return (
    <ModalBuilder
      open={open}
      onClose={onClose}
      isTitleCenter
      alignFooter="center"
      title="Invitar a oportunidad"
      width="60vw"
      height="60vh"
      autoHeigth
      styledTitle={{
        fontFamily: FontsData?.reg,
        fontSize: '1.6em',
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        ) : (
          vacancies
            ?.filter((option) => option?.status === 'active')
            .map((option) => (
              <div className="rounded-md bg-cream p-4">
                <div className="grid grid-cols-[1fr_100px]">
                  <h3 className="text-base font-medium">{option?.dataCompany?.companyName || option?.companyName}</h3>
                  <div>
                    {option?.salary?.type === 'range' && (
                      <span>{`$ ${option?.salary?.min} - ${option?.salary?.max}`}</span>
                    )}
                    {option?.salary?.type === 'exact' && <span>{`$ ${option?.salary?.total || 0}`}</span>}
                    {(typeof option?.salary === 'number' || typeof option?.salaryWork === 'number') && (
                      <span>${option?.salaryWork || ' TBD'}</span>
                    )}
                    {/* {!option?.salary && <span>$TBD</span>} */}
                    <br />
                    <span>{option['Zona de trabajo'] || option?.location || 'Zona no determinada'}</span>
                  </div>
                </div>
                <FormControlLabel
                  name={option.docID}
                  checked={arrayChecked.includes(option?.docID)}
                  control={<Checkbox />}
                  label={option.name}
                  onChange={onChange}
                  className="text-circle text-[14px]"
                />
              </div>
            ))
        )}
      </div>
      <ActionsModal className="bg-purple">
        <button
          onClick={onClose}
          type="button"
          className="cursor-pointer rounded-lg border-none bg-pink px-[20px] py-[10px] text-base text-white outline-none"
        >
          Cancelar
        </button>
        <button
          className="cursor-pointer rounded-lg border-none bg-white px-[20px] py-[10px] text-base text-purple"
          type="button"
          onClick={onSubmit}
        >
          Invitar
        </button>
      </ActionsModal>
    </ModalBuilder>
  );
};
export default ModalInviteVacancy;
