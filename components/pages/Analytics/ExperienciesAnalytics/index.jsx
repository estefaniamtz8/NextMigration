import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineCloseCircle, AiOutlineSave } from 'react-icons/ai';
import toast from 'react-hot-toast';
import {
  dictionaryToProfession,
  getDictionary,
  getProfessionsWithoutSegment,
  getSegments,
  insertSegment,
  rejectProfession,
  segmentProfession,
} from '../../../../services/professions';

const ExperiencesList = () => {
  const clientQuery = useQueryClient();

  const { data: dataProfessions, isLoading: loadingProfessions } = useQuery({
    queryFn: () => getProfessionsWithoutSegment(),
    queryKey: ['professionsWithoutSegment'],
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  const { data: dataSegments } = useQuery({
    queryFn: () => getSegments(),
    queryKey: ['segments'],
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  const { data: dataDictionary } = useQuery({
    queryFn: () => getDictionary(),
    queryKey: ['dictionary'],
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  const [selectedProfession, setSelectedProfession] = useState({
    name: '',
    segment: '',
    dictionary: '',
  });

  const [classificationType, setClassificationType] = useState(1);

  const [addSegment, setAddSegment] = useState({
    add: false,
    name: '',
  });

  const { mutate: mutateAddSegment } = useMutation({
    mutationFn: insertSegment,
    onSuccess: () => {
      toast.success('Se añadió el segmento');
      clientQuery.invalidateQueries('segments');
      setSelectedProfession({ ...selectedProfession, segment: addSegment?.name });
      setAddSegment({ add: false, name: '' });
    },
    onError: () => toast.error('Ha habido un error'),
  });

  const { mutate: mutateRejectProfession } = useMutation({
    mutationFn: rejectProfession,
    onSuccess: () => {
      toast.success('Se rechazó el puesto');
      clientQuery.invalidateQueries('professions');
      setSelectedProfession({ name: '', segment: '', dictionary: '' });
    },
    onError: () => toast.error('Ha habido un error'),
  });

  const { mutate: mutateSegmentProfession } = useMutation({
    mutationFn: segmentProfession,
    onSuccess: () => {
      toast.success('Se segmentó el puesto');
      clientQuery.invalidateQueries('professions');
      setSelectedProfession({ name: '', segment: '', dictionary: '' });
    },
    onError: () => toast.error('Ha habido un error'),
  });

  const { mutate: mutateDictionaryToProfession } = useMutation({
    mutationFn: dictionaryToProfession,
    onSuccess: () => {
      toast.success('Se agregó el puesto al diccionario');
      clientQuery.invalidateQueries('professions');
      setSelectedProfession({ name: '', segment: '', dictionary: '' });
    },
    onError: () => toast.error('Ha habido un error'),
  });

  const onSaveSegment = () => {
    mutateAddSegment({ segment: addSegment?.name });
  };

  return (
    <div className="grid grid-cols-[30%_70%] gap-x-12 rounded-lg bg-white px-8 py-4 shadow-md">
      <div className="flex flex-col gap-y-4">
        <h6 className="font-sans text-xl font-medium">Lista</h6>
        {loadingProfessions ? (
          <div className="h-96">
            <CircularProgress className="text-purple" />
          </div>
        ) : (
          <div className="flex h-96 max-h-96 flex-col gap-y-2 overflow-y-auto pt-4">
            {dataProfessions?.professions?.map((profession) => (
              <button
                key={profession?.value}
                className="w-full cursor-pointer rounded-lg border-none bg-purple py-2 text-white outline-none"
                type="button"
                onClick={() => setSelectedProfession({ name: profession?.value, segment: '' })}
              >
                {profession?.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        <h6 className="font-sans text-xl font-medium">Formulario</h6>
        <div className="flex flex-col gap-x-6 gap-y-4">
          <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
            <label className="text-sm" htmlFor="email">
              Puesto
            </label>
            <input
              readOnly
              value={selectedProfession?.name}
              className="h-[2.25rem] rounded-lg border-none bg-cream pl-4 font-sans"
              id="email"
              type="email"
            />
          </div>
          <label className="text-sm" htmlFor="email">
            Clasificación por
          </label>
          <div className="flex gap-x-8">
            <div className="flex items-center gap-x-2">
              <input
                onChange={() => setClassificationType(1)}
                id="clasification"
                name="clasification"
                type="radio"
                className="border-gray-300 h-4 w-4 accent-purple"
                value={1}
                checked={classificationType === 1}
              />
              <label className="text-sm" htmlFor="email">
                Diccionario
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                onChange={() => setClassificationType(2)}
                id="clasification"
                name="clasification"
                type="radio"
                className="border-gray-300 h-4 w-4 accent-purple"
                value={2}
                checked={classificationType === 2}
              />
              <label className="text-sm" htmlFor="email">
                Segmento
              </label>
            </div>
          </div>
          {classificationType === 1 && (
            <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="email">
                Diccionario
              </label>
              <div className="flex items-center gap-x-2">
                <select
                  className="w-full rounded-lg border-0 bg-cream px-4 py-2.5 font-sans text-sm"
                  defaultValue={selectedProfession?.dictionary}
                  value={selectedProfession?.dictionary}
                  onChange={(e) => setSelectedProfession({ ...selectedProfession, dictionary: e.target.value })}
                >
                  <option value="" disabled hidden>
                    Selecciona un diccionario
                  </option>
                  {dataDictionary?.dictionary
                    ?.sort((a, b) => a?.label?.localeCompare(b.label))
                    ?.map((segment) => (
                      <option value={segment?.label}>{segment?.label}</option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {classificationType === 2 && (
            <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="email">
                Segmento
              </label>
              {addSegment?.add ? (
                <div className="flex items-center gap-x-2">
                  <input
                    onChange={(e) => setAddSegment({ ...addSegment, name: e.target.value })}
                    value={addSegment?.name}
                    className="h-[2.25rem] w-full rounded-lg border-none bg-cream pl-4 font-sans"
                    id="segment"
                    type="segment"
                  />
                  <AiOutlineSave onClick={onSaveSegment} size={20} className="cursor-pointer text-purple" />
                  <AiOutlineCloseCircle
                    onClick={() => setAddSegment({ add: false, segment: '' })}
                    size={20}
                    className="cursor-pointer text-purple"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  <select
                    className="w-full rounded-lg border-0 bg-cream px-4 py-2.5 font-sans text-sm"
                    defaultValue={selectedProfession?.segment}
                    value={selectedProfession?.segment}
                    onChange={(e) => setSelectedProfession({ ...selectedProfession, segment: e.target.value })}
                  >
                    <option value="" disabled hidden>
                      Selecciona un segmento
                    </option>
                    {dataSegments?.segments?.map((segment) => (
                      <option value={segment?.label}>{segment?.label}</option>
                    ))}
                  </select>
                  <IoIosAddCircleOutline
                    onClick={() => setAddSegment({ add: true, segment: '' })}
                    size={20}
                    className="cursor-pointer text-purple"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex w-1/2 gap-x-2">
            {classificationType === 1 && (
              <button
                onClick={() =>
                  mutateDictionaryToProfession({
                    profession: selectedProfession?.name,
                    dictionary: selectedProfession?.dictionary,
                  })
                }
                disabled={selectedProfession?.dictionary === ''}
                type="button"
                className="text-main mt-2 h-[2.25rem] w-1/2 cursor-pointer rounded-lg border-none bg-purple px-6 text-white outline-none disabled:cursor-not-allowed disabled:bg-gray"
              >
                Añadir a diccionario
              </button>
            )}
            {classificationType === 2 && (
              <button
                onClick={() =>
                  mutateSegmentProfession({
                    profession: selectedProfession?.name,
                    segment: selectedProfession?.segment,
                  })
                }
                disabled={addSegment?.add || selectedProfession?.segment === ''}
                type="button"
                className="text-main mt-2 h-[2.25rem] w-1/2 cursor-pointer rounded-lg border-none bg-purple px-6 text-white outline-none disabled:cursor-not-allowed disabled:bg-gray"
              >
                Añadir a segmento
              </button>
            )}
            <button
              onClick={() => mutateRejectProfession({ profession: selectedProfession?.name })}
              disabled={addSegment?.add}
              type="button"
              className="text-main mt-2 h-[2.25rem] w-1/2 cursor-pointer rounded-lg border-[1px] border-solid border-purple bg-white px-6 text-purple outline-none disabled:cursor-not-allowed disabled:bg-gray"
            >
              Rechazar puesto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesList;
